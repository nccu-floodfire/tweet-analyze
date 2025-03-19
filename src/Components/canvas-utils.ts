import { Settings } from "sigma/settings";
import { NodeDisplayData, PartialButFor, PlainObject } from "sigma/types";

const TEXT_COLOR = "#000000";

/**
 * This function draw in the input canvas 2D context a rectangle.
 * It only deals with tracing the path, and does not fill or stroke.
 */
export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Custom hover renderer
 */
export function drawHover(context: CanvasRenderingContext2D, data: PlainObject, settings: PlainObject) {
  const size = settings.labelSize;
  const font = settings.labelFont;
  const weight = settings.labelWeight;
  const subLabelSize = size - 2;
  // console.log('dataaaa:',data)

  const label = data.label;
  const subLabel = data.tag !== "unknown" ? data.tag : "";
  // console.log('subLabel:',subLabel)
  const clusters = [
    { "key": "A", "color": "#FEF4DC", "clusterLabel": "中立" },
    { "key": "B", "color": "#D85656", "clusterLabel": "支持中國共產黨及習近平" },
    { "key": "C", "color": "#F7826C", "clusterLabel": "支持中國共產黨" },
    { "key": "F", "color": "#B2D0E3", "clusterLabel": "反對中國" },
    { "key": "G1", "color": "#95AAA2", "clusterLabel": "反對中國及習近平" },
    { "key": "G2", "color": "#B5E3EA", "clusterLabel": "反對中國及習近平但支持共產黨" },
    { "key": "H", "color": "#C3D4C8", "clusterLabel": "反對中國及共產黨但支持習近平" },
    { "key": "J", "color": "#5776B5", "clusterLabel": "反對中國共產黨及習近平" },
    { "key": "無貼文判斷立場", "color": "#F5F5F2", "clusterLabel": "無貼文判斷立場" }
  ];
  
  function getClusterLabel(key) {
    const clusterObj = clusters.find(c => c.key === key);
    return clusterObj ? clusterObj.clusterLabel : null;
  }
  const cluster = data.cluster;
  const clusterLabel = getClusterLabel(cluster);
  console.log('clusterLabel:',clusterLabel)

  // Then we draw the label background
  context.beginPath();
  context.fillStyle = "#fff";
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 2;
  context.shadowBlur = 8;
  context.shadowColor = "#000";

  context.font = `${weight} ${size}px ${font}`;
  const labelWidth = context.measureText(label).width;
  context.font = `${weight} ${subLabelSize}px ${font}`;
  const subLabelWidth = subLabel ? context.measureText(subLabel).width : 0;
  context.font = `${weight} ${subLabelSize}px ${font}`;
  const clusterLabelWidth = clusterLabel ? context.measureText(clusterLabel).width : 0;

  const textWidth = Math.max(labelWidth, subLabelWidth, clusterLabelWidth);


  const x = Math.round(data.x);
  const y = Math.round(data.y);
  const w = Math.round(textWidth + size / 2 + data.size + 3);
  const hLabel = Math.round(size / 2 + 4)*1.5;
  const hSubLabel = subLabel ? Math.round(subLabelSize / 2 + 9)*1.5 : 0;
  const hClusterLabel = Math.round(subLabelSize / 2 + 9)*1.5;

  drawRoundRect(context, x, y - hSubLabel - 12, w, hClusterLabel + hLabel + hSubLabel + 12, 5);
  context.closePath();
  context.fill();

  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 0;

  // And finally we draw the labels
  context.fillStyle = TEXT_COLOR;
  context.font = `${weight} ${size}px ${font}`;
  context.fillText(label, data.x + data.size + 3, data.y + size / 3);

  if (subLabel) {
    context.fillStyle = TEXT_COLOR;
    context.font = `${weight} ${subLabelSize}px ${font}`;
    context.fillText(subLabel, data.x + data.size + 3, data.y - (2 * size) / 3 - 2);
  }

  context.fillStyle = data.color;
  context.font = `${weight} ${subLabelSize}px ${font}`;
  context.fillText(clusterLabel, data.x + data.size + 3, data.y + size / 3 + 3 + subLabelSize);
}

/**
 * Custom label renderer
 */
export function drawLabel(
  context: CanvasRenderingContext2D,
  data: PartialButFor<NodeDisplayData, "x" | "y" | "size" | "label" | "color">,
  settings: Settings,
): void {
  if (!data.label) return;
  // console.log('data:',data)

  const size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight;

  context.font = `${weight} ${size}px ${font}`;
  const width = context.measureText(data.label).width + 8;

  context.fillStyle = "#ffffffcc";
  context.fillRect(data.x + data.size, data.y + size / 3 - 25, width, 35);

  context.fillStyle = "#000";
  context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
}