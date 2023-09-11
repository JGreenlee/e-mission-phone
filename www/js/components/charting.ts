import color from 'color';
import { getBaseModeByKey } from '../diary/diaryHelper';
import { readableLabelToKey } from '../survey/multilabel/confirmHelper';

export const defaultPalette = [
  '#c95465', // red oklch(60% 0.15 14)
  '#4a71b1', // blue oklch(55% 0.11 260)
  '#d2824e', // orange oklch(68% 0.12 52)
  '#856b5d', // brown oklch(55% 0.04 50)
  '#59894f', // green oklch(58% 0.1 140)
  '#e0cc55', // yellow oklch(84% 0.14 100)
  '#b273ac', // purple oklch(64% 0.11 330)
  '#f09da6', // pink oklch(78% 0.1 12)
  '#b3aca8', // grey oklch(75% 0.01 55)
  '#80afad', // teal oklch(72% 0.05 192)
];

export function getChartHeight(chartDatasets, numVisibleDatasets, indexAxis, isHorizontal, stacked) {
  /* when horizontal charts have more data, they should get taller
    so they don't look squished */
  if (isHorizontal) {
    // 'ideal' chart height is based on the number of datasets and number of unique index values
    const uniqueIndexVals = [];
    chartDatasets.forEach(e => e.data.forEach(r => {
      if (!uniqueIndexVals.includes(r[indexAxis])) uniqueIndexVals.push(r[indexAxis]);
    }));
    const numIndexVals = uniqueIndexVals.length;
    const heightPerIndexVal = stacked ? 36 : numVisibleDatasets * 8;
    const idealChartHeight = heightPerIndexVal * numIndexVals;

    /* each index val should be at least 20px tall for visibility,
      and the graph itself should be at least 250px tall */
    const minChartHeight = Math.max(numIndexVals * 20, 250);

    // return whichever is greater
    return { height: Math.max(idealChartHeight, minChartHeight) };
  }
  // vertical charts should just fill the available space in the parent container
  return { flex: 1 };
}

function getBarHeight(stacks) {
  let totalHeight = 0;
  console.log("ctx stacks", stacks.x);
  for(let val in stacks.x) {
    if(!val.startsWith('_')){
      totalHeight += stacks.x[val];
      console.log("ctx added ", val );
    }
  }
  return totalHeight;
}

//fill pattern creation
//https://stackoverflow.com/questions/28569667/fill-chart-js-bar-chart-with-diagonal-stripes-or-other-patterns
function createDiagonalPattern(color = 'black') {
  let shape = document.createElement('canvas')
  shape.width = 10
  shape.height = 10
  let c = shape.getContext('2d')
  c.strokeStyle = color
  c.lineWidth = 2
  c.beginPath()
  c.moveTo(2, 0)
  c.lineTo(10, 8)
  c.stroke()
  c.beginPath()
  c.moveTo(0, 8)
  c.lineTo(2, 10)
  c.stroke()
  return c.createPattern(shape, 'repeat')
}

export function getMeteredBackgroundColor(meter, currDataset, barCtx, colors, darken=0) {
  if (!barCtx || !currDataset) return;
  let bar_height = getBarHeight(barCtx.parsed._stacks);
  console.debug("bar height for", barCtx.raw.y, " is ", bar_height, "which in chart is", currDataset);
  let meteredColor;
  if (bar_height > meter.high) meteredColor = colors.danger;
  else if (bar_height > meter.middle) meteredColor = colors.warn;
  else meteredColor = colors.success;
  if (darken) {
    return color(meteredColor).darken(darken).hex();
  }
  //if "unlabeled", etc -> stripes
  if (currDataset.label == meter.dash_key) {
    return createDiagonalPattern(meteredColor);
  }
  //if :labeled", etc -> solid
  return meteredColor;
}

/**
 * @param baseColor a color string
 * @param change a number between -1 and 1, indicating the amount to darken or lighten the color
 * @returns an adjusted color, either darkened or lightened, depending on the sign of change
 */
function darkenOrLighten(baseColor: string, change: number) {
  let colorObj = color(baseColor);
  if(change > 0) {
    // darkening appears more drastic than lightening, so we will be less aggressive (scale change by .5)
    return colorObj.darken(Math.abs(change * .5)).hex();
  } else {
    return colorObj.lighten(Math.abs(change)).hex();
  }
}

/**
 * @param colors an array of colors, each of which is an array of [key, color string]
 * @returns an object mapping keys to colors, with duplicates darkened/lightened to be distinguishable
 */
export const dedupColors = (colors: string[][]) => {
  const dedupedColors = {};
  const maxAdjustment = 0.7; // more than this is too drastic and the colors approach black/white
  for (const [key, clr] of colors) {
    if (!clr) continue; // skip empty colors
    const duplicates = colors.filter(([k, c]) => c == clr);
    if (duplicates.length > 1) {
      // there are duplicates; calculate an evenly-spaced adjustment for each one
      duplicates.forEach(([k, c], i) => {
        const change = -maxAdjustment + (maxAdjustment*2 / (duplicates.length - 1)) * i;
        dedupedColors[k] = darkenOrLighten(clr, change);
      });
    } else if (!dedupedColors[key]) {
      dedupedColors[key] = clr; // not a dupe, & not already deduped, so use the color as-is
    }
  }
  return dedupedColors;
}