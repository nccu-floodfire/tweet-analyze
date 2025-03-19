import { FullScreenControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import { createNodeImageProgram } from "@sigma/node-image";
import { DirectedGraph } from "graphology";
import { constant, keyBy, mapValues, omit } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { BiBookContent, BiRadioCircleMarked } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Settings } from "sigma/settings";

import { drawHover, drawLabel } from "../canvas-utils";
import { Dataset, FiltersState } from "../types";
import ClustersPanel from "./ClustersPanel";
import DescriptionPanel from "./DescriptionPanel";
import GraphDataController from "./GraphDataController";
import GraphEventsController from "./GraphEventsController";
import GraphSettingsController from "./GraphSettingsController";
import GraphTitle from "./GraphTitle";
import SearchField from "./SearchField";
import TagsPanel from "./TagsPanel";
import "@react-sigma/core/lib/react-sigma.min.css"
import "../styles.css";
import { saveAs } from "file-saver";

interface RootProps {
  data: any; // 你的資料類型
  highlightedNode: string | null; // 新增的屬性
  // onItemSelected?: (node: string) => void;
}

const Network: React.FC<RootProps> = ({data, highlightedNode}) => {
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  // const [highlightNode, setHighlightedNode] = useState<string | null>(highlightedNode); // 新增的狀態
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  // console.log('highlightedNode:',highlightedNode);
  const sigmaSettings: Partial<Settings> = useMemo(
    () => ({
      nodeProgramClasses: {
        image: createNodeImageProgram({
          size: { mode: "force", value: 256 },
        }),
      },
      defaultDrawNodeLabel: drawLabel,
      defaultDrawNodeHover: drawHover,
      defaultNodeType: "image",
      defaultEdgeType: "arrow",
      defaultEdgeColor: "white",
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: 15,
      labelFont: "Lato, sans-serif",
      zIndex: true,
      labelSize: 25,
      // allowInvalidContainer: true
    }),
    [],
  );

  // Load data on mount:
  useEffect(() => {
    // fetch(`./dataset.json`)
    //   .then((res) => res.json())
    //   .then((dataset: Dataset) => {
        // setDataset(data);
        // console.log('uuuu:',data);
        setFiltersState({
          clusters: mapValues(keyBy(data.clusters, "key"), constant(true)),
          tags: mapValues(keyBy(data.tags, "key"), constant(true)),
        });
        requestAnimationFrame(() => setDataReady(true));
  }, [data]);
  ////position:'relative', ,, paddingLeft:'200px',paddingRight:'200px',paddingTop:'50px', marginLeft:'10%',marginRight:'10%'

  const exportGraphAsImage = () => {
    const sigma = document.querySelector(".react-sigma canvas") as HTMLCanvasElement;
    if (sigma) {
      sigma.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "network_graph.png");
        }
      }, "image/png");
    }
  };

  if (!data) return null;

  return (
    <div id="app-root" className={showContents ? "show-contents" : ""} style={{height:'2000px',width:'80%',margin: '0 auto'}}> 
      <SigmaContainer graph={DirectedGraph} settings={sigmaSettings} className="react-sigma">
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />
        <GraphDataController dataset={data} filters={filtersState} />

        {dataReady && (
          <>
            <div className="controls">
              {/* <div className="react-sigma-control ico">
                <button
                  type="button"
                  className="show-contents"
                  onClick={() => setShowContents(true)}
                  title="Show caption and description"
                >
                  <BiBookContent />
                </button>
              </div> */}
              {/* <FullScreenControl className="ico">
                <BsArrowsFullscreen />
                <BsFullscreenExit />
              </FullScreenControl> */}

              {/* <ZoomControl className="ico">
                <BsZoomIn />
                <BsZoomOut />
                <BiRadioCircleMarked />
              </ZoomControl> */}
              <button onClick={exportGraphAsImage} className="export-btn">
                Save as PNG
              </button>
            </div>
            <div className="contents">
              {/* <div className="ico">
                <button
                  type="button"
                  className="ico hide-contents"
                  onClick={() => setShowContents(false)}
                  title="Show caption and description"
                >
                  <GrClose />
                </button>
              </div> */}
              {/* <GraphTitle filters={filtersState} /> */}
              {/* <div className="panels">
                <SearchField filters={filtersState} highlightNode={highlightedNode} />
                <DescriptionPanel />
                <ClustersPanel
                  clusters={data.clusters}
                  filters={filtersState}
                  setClusters={(clusters) =>
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters,
                    }))
                  }
                  toggleCluster={(cluster) => {
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters: filters.clusters[cluster]
                        ? omit(filters.clusters, cluster)
                        : { ...filters.clusters, [cluster]: true },
                    }));
                  }}
                />
                <TagsPanel
                  tags={data.tags}
                  filters={filtersState}
                  setTags={(tags) =>
                    setFiltersState((filters) => ({
                      ...filters,
                      tags,
                    }))
                  }
                  toggleTag={(tag) => {
                    setFiltersState((filters) => ({
                      ...filters,
                      tags: filters.tags[tag] ? omit(filters.tags, tag) : { ...filters.tags, [tag]: true },
                    }));
                  }}
                />
              </div> */}
            </div>
          </>
        )}
      </SigmaContainer>
   </div>
  );
};

export default Network;