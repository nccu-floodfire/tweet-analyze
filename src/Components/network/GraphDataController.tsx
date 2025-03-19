import { useSigma } from "@react-sigma/core";
import { keyBy, omit } from "lodash";
import { FC, PropsWithChildren, useEffect } from "react";
import React, { useState } from 'react';
import sigma from 'sigma';
import Graph from 'graphology';
import { createNodeImageProgram } from '@sigma/node-image';
import ForceSupervisor from 'graphology-layout-force/worker';
import { Dataset, FiltersState } from "../types";
import { color } from "@mui/system";

const GraphDataController: FC<PropsWithChildren<{ dataset: Dataset; filters: FiltersState }>> = ({
  dataset,
  filters,
  children,
}) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  // const graph = new Graph();
  const [previousdataset, setpreviousdataset] = useState<any>(null);
  if (previousdataset === null) {
    setpreviousdataset(dataset);
  }

  const updateNodeSizes = () => {
    const scores = graph.nodes().map(node => graph.getNodeAttribute(node, "score"));
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const MIN_NODE_SIZE = 10;
    const MAX_NODE_SIZE = 40;

    graph.forEachNode((node) => {
      const score = graph.getNodeAttribute(node, "score");
      const size = ((score - minScore) / (maxScore - minScore)) * (MAX_NODE_SIZE - MIN_NODE_SIZE) + MIN_NODE_SIZE;
      graph.setNodeAttribute(node, "size", size);
    });
  };

  useEffect(() => {
    if (!dataset) return;

    const clusters = keyBy(dataset.clusters, "key");
    const tags = keyBy(dataset.tags, "key");
    // console.log('pre:',previousdataset)

    dataset.nodes.forEach((node) => {
      if (!graph.hasNode(node.key)) {
        // 確保 'x' 和 'y' 屬性的值是數字
        let x = Number(node.x);
        let y = Number(node.y);
        // 如果 'x' 或 'y' 不是數字，則跳過此節點
        if (isNaN(x) || isNaN(y)) {
          console.error(`Coordinates of node ${node.key} are invalid. A node must have a numeric 'x' and 'y' attribute.`);
          return;
        }
        graph.addNode(node.key, {
          ...node,
          x: Number(node.x),
          y: Number(node.y),
          ...omit(dataset.clusters[node.cluster], "key"),
          image: `./images/${dataset.tags[node.tag]}`,
        });

        // console.log('graph:',graph)

        // graph.addNode(node.key, {
        //   ...node,
        //   x: x,  // 使用數字型的 'x' 屬性值
        //   y: y,  // 使用數字型的 'y' 屬性值
        //   color: initialColor,
        //   ...omit(clusters[node.cluster], "key"),
        //   image: `./images/${tags[node.tag].image}`,
        // });
      }
    });

    dataset.edges.forEach(([source, target]) => {
      if (!graph.hasEdge(source, target)) {
        graph.addEdge(source, target, { size: 1 })}});
    // dataset.edges.forEach(([source, target]) => graph.addEdge(source, target, { size: 1 }));
    updateNodeSizes();
    // // Use degrees as node sizes:
    // const scores = graph.nodes().map((node) => graph.getNodeAttribute(node, "score"));
    // const minDegree = Math.min(...scores);
    // const maxDegree = Math.max(...scores);
    // const MIN_NODE_SIZE = 10;
    // const MAX_NODE_SIZE = 40;
    // graph.forEachNode((node) =>
    //   graph.setNodeAttribute(
    //     node,
    //     "size",
    //     ((graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
    //       (MAX_NODE_SIZE - MIN_NODE_SIZE) +
    //       MIN_NODE_SIZE,
    //   ),
    // );
    

    // const renderer = new sigma(graph, document.getElementById('container')!,{
    //   nodeProgramClasses: {
    //     image: createNodeImageProgram(),
    //   },
    //   renderEdgeLabels: true,
    // });

    // const layout = new ForceSupervisor(graph);
    // layout.start();
    // renderer.refresh();
    // layout.stop();


    

    function animateNodeMovement(nodeId:string,startX:number, targetX:number,startY:number, targetY:number, duration:number) {
      // console.log('targetY:',targetY)
      // console.log('startY',startY)
      const startTime = Date.now();
      // console.log('startTime',startTime)

      function animate() {
        const elapsedTime = Date.now() - startTime;
        // console.log('elapsedTime',elapsedTime)
        const fraction = Math.min(elapsedTime / duration, 1);
        // console.log('fraction',fraction)
        const diffX = (targetX - startX) * fraction
        const diffY = (targetY - startY) * fraction
        // console.log('diff',diff)
        const newX = Number(startX) + Number(diffX) ;
        const newY = Number(startY) + Number(diffY) ;
        // console.log('newY1',newY)
        graph.setNodeAttribute(nodeId, 'x', newX);
        graph.setNodeAttribute(nodeId, 'y', newY);
        // console.log('graph:',graph)
        // renderer.refresh();

        if (fraction < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }

    function animateColorChange (nodeKey:string, startColor:string, endColor:string) {
      const startTime = Date.now();
      const duration = 1000; // Duration of the animation in milliseconds
    
      const interpolateColor = (start, end, fraction) => {
        // Simple linear interpolation for each color component
        // console.log('start:',start)
        // console.log('end:',end)
        const r = Math.round(start.r + (end.r - start.r) * fraction);
        const g = Math.round(start.g + (end.g - start.g) * fraction);
        const b = Math.round(start.b + (end.b - start.b) * fraction);
        return rgbToHex(r, g, b);
      };
    
      const startRGB = hexToRgb(startColor);
      const endRGB = hexToRgb(endColor);
    
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const fraction = Math.min(elapsedTime / duration, 1);
        // console.log('fraction:',fraction)
        const newColor = interpolateColor(startRGB, endRGB, fraction);
        // console.log('newColor:',newColor)
        graph.setNodeAttribute(nodeKey, 'color', newColor);
        // renderer.refresh();
    
        if (fraction < 1) {
          requestAnimationFrame(animate);
        }
      };
    
      requestAnimationFrame(animate);
    };
    
    const hexToRgb = (hex) => {
      // Convert hex to RGB
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    
    const rgbToHex = (r, g, b) => {
      // Convert RGB to hex
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    };

    dataset.nodes.forEach((node) => {
      const newx = node.x;
      const newy = node.y;
      // console.log('newy:',newy)
      if (previousdataset.nodes.find((n) => n.key === node.key)) {
        const previousx = previousdataset.nodes.find((n) => n.key === node.key).x;
        const previousy = previousdataset.nodes.find((n) => n.key === node.key).y;
        const diffx = newx - previousx;
        const diffy = newy - previousy;
        // console.log('prey:',previousy)
        // console.log('diffy:',diffy)
        animateNodeMovement(node.key, previousx, newx, previousy, newy, 1000);
        animateColorChange(node.key, clusters[previousdataset.nodes.find((n) => n.key === node.key).cluster].color, clusters[node.cluster].color);
        // console.log('preclusters:',clusters[previousdataset.nodes.find((n) => n.key === node.key).cluster].color)

      } else {
        const previousx = newx;
        const previousy = newy;
        animateNodeMovement(node.key, previousx, newx, previousy, newy, 1000);
        animateColorChange(node.key,clusters[node.cluster].color , clusters[node.cluster].color);

      }

      setpreviousdataset(dataset);

    });

    

    return () => {
      // layout.stop();
      // renderer.kill();
      graph.clear();
    };
  }, [graph,dataset]);

  





    // return () => graph.clear();
  // }, [graph, dataset]);

  /**
   * Apply filters to graphology:
   */
  useEffect(() => {
    const { clusters, tags } = filters;
    graph.forEachNode((node, { cluster, tag }) =>
      graph.setNodeAttribute(node, "hidden", !clusters[cluster] || !tags[tag]),
    );
  }, [graph, filters]);

  // console.log('children:',children)

  return( 
    <>
      {/* <div id="container" style={{width: '100%', height: '100%'}}> */}
      {children}
      {/* </div> */}
    </>
  );
};

export default GraphDataController;