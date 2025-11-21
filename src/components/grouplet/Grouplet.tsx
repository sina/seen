'use client';

import { useState } from "react";
import type React from "react";
import { Billiard } from "../billiard/Billiard.tsx";
import GroupSegment from "./GroupSegment.tsx";
import GroupSegmentEnd from "./GroupSegmentEnd.tsx";
import useWindowSize from "./hook/useWindowSize.js";
import { playAudio, randomListItem } from "../../consts.ts";
import { POOL_AUDIO } from "../../assets/audio/pool-audio.js";
import poolSounds from '../../assets/audio/mp3/pool-sounds.mp3';
import unlockSounds from '../../assets/audio/mp3/unlocks.mp3';
import './style/grouplet.css';

enum Operation {
  GreaterThanEqual = 1,
  LessThanEqual = 2
}

interface Entry {
  id: string,
  title?: string,
  iconEmoji?: string,
  segmentEnd?: boolean,
  pathType?: string
}

interface Settings {
  columns: number,
  breakpoint: {
    threshold: number,
    operation: Operation
  }
}

interface Props {
  list: Entry[],
  columns?: number,
  columnSettings: Array<Settings>
}

let columns = 3;
const UNLOCK_COUNT = 4;
const formatListItems = (list: Entry[], columns: number, wrapType = 'standard') => {
  let groupletList = list.slice();
  let formattedList = [] as Array<any>;
  let tempList = [] as Array<any>;
  const segmentEndFirst = {id: '', title: '', segmentEnd: true, pathType: 'before first'};
  const segmentEndLastLeft = {id: '', title: '', segmentEnd: true, pathType: 'after last left'};  
  const segmentEndLastRight = {id: '', title: '', segmentEnd: true, pathType: 'after last right'};  
  const segmentEndBefore = {id: '', title: '', segmentEnd: true, pathType: 'before'};
  const segmentEndAfter = {id: '', title: '', segmentEnd: true, pathType: 'after'};
  const segmentEndSpacer = {id: '', title: '', segmentEnd: true, pathType: 'spacer'};

  while (groupletList.length > 0) {
    if (wrapType === 'standard') {
      tempList.push(formattedList.length === 0 ? segmentEndFirst : segmentEndBefore);

      let firstSet = groupletList.splice(0, columns);
      let nextSet = groupletList.splice(0, columns).reverse();

      if (groupletList.length !== 0) {
        firstSet.push(segmentEndSpacer);
        nextSet.unshift(segmentEndSpacer);
        nextSet.push(segmentEndAfter);
      } else {
        // case 1: both sets have items
        // case 2: only the first set has items

        if (nextSet.length === 0) {
          firstSet.push(segmentEndLastRight);
        } else {
          firstSet.push(segmentEndSpacer);
          nextSet.push(segmentEndAfter);
          nextSet.unshift(segmentEndLastLeft);
        }
      }

      tempList = [...tempList, ...firstSet, ...nextSet];
    } else {
      tempList = groupletList.splice(0, columns);
      tempList.push(segmentEndFirst);
    }

    formattedList = [...formattedList, ...tempList];
    tempList = [];
  }

  return formattedList;
};

const parseSettings = (settings: Array<Settings>) => {
  const windowSize = useWindowSize();
  const defaultColumns = 3;
  const setting = settings.find(entry => {
    return entry.breakpoint.operation === Operation.GreaterThanEqual
      ? windowSize.width >= entry.breakpoint.threshold
      : windowSize.width <= entry.breakpoint.threshold
  });

  return setting?.columns || defaultColumns;
};

const groupletMarkup = (list: Entry[], callback: Function, styleType = 'standard') => {
  const items = formatListItems(list, columns, styleType);
  let markup: React.ReactElement[] = [];
  markup.push(<Billiard key="fmt-lbl" className="absolute! z-[3] top-[5vh] left-[calc(100%-3em)] w-8 opacity-45 hover:animate-pulse cursor-cue" count={columns} design="tournament-black" click={callback}/>);

  items.map((entry, index) => {
    let tradIndex = index + 1;

    markup.push( entry.segmentEnd
      ? <GroupSegmentEnd pathType={entry.pathType} index={tradIndex} key={`entry-${tradIndex}`}/>
      : <GroupSegment index={tradIndex} data={entry.data} key={`entry-${tradIndex}`}/>
    );
  });

  return markup;
};

const Grouplet = ({ list, columnSettings }: Props) => {
  const [poolClicks, setPoolClicks] = useState(0);

  const animateDrop = () => {
    setPoolClicks(poolClicks + 1);

    if (poolClicks > 0 && poolClicks % UNLOCK_COUNT === 0) {
      const audioClip = randomListItem(POOL_AUDIO.unlocks);
      playAudio(unlockSounds, audioClip.startTime, audioClip.stopTime);
      window.open(`${import.meta.env.BASE_URL}/eggs/${audioClip.label}`, 'egg');
    } else {
      const audioClip = randomListItem(POOL_AUDIO.breaks);
      playAudio(poolSounds, audioClip.startTime, audioClip.stopTime);
    }

    //global event
    const target = event?.target as HTMLElement;
    target.classList.add('dropAway');


    // reset after 5s
    setTimeout(() => {
      target.classList.replace('dropAway', 'rollback');

      if (poolClicks % UNLOCK_COUNT !== 0) {
        const audioClip = randomListItem(POOL_AUDIO.resets);
        playAudio(poolSounds, audioClip.startTime, audioClip.stopTime);
      }

      //reset after animation to avoid conflict with tailwind hover animation
      setTimeout(() => {
        target.classList.remove('rollback');
      }, 1200);
    }, 5000);
  };

  columns = parseSettings(columnSettings);
  // if list items don't perfectly separate into available columns
  // and maximum complete entries in row are even, 
  // justify flex at the start, otherwise at the end
  const justifyStyle = (list.length % columns !== 0) && (Math.trunc(list.length / columns) % 2 === 0) 
    ? 'justify-start'
    : 'justify-end';

  return (
    <section className={`group-section ${justifyStyle}`}>
      {
        groupletMarkup(list, animateDrop)
      }
    </section>
  );
};

export default Grouplet;