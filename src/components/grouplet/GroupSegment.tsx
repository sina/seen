import { openInNewTab, randomEmoji, randomFilterClass } from '../../consts';

type Props = {
  index: number
  data: Work
}

type StackHighlight = {
  label: string,
  link: string
}

interface Work {
    id: string,
    content?: string,
    detailPage?: string,
    entryDate?: Date,
    iconEmoji?: string,
    imageScreenshots?: string[],
    organization?: string,
    organizationLogo?: string,
    organizationUrl?: string,
    stackHighlights?: StackHighlight[],
    summary?: string,
    title: string,
    segmentEnd?: boolean,
    pathType?: string
};

const handleClickDetail = (targetUrl: string = '#') => {
  openInNewTab(targetUrl);
};

const GroupSegment = ({ index, data }: Props) => {
  return (
    <>
    {
    <div className="work-segment h-24" data-index={index}>
      <div className="label text-base">#{data.organization}</div>
      <div className="icon">
        {
          data.organizationLogo
          ? <img src={`${import.meta.env.BASE_URL}${data.organizationLogo}`} alt="" className="image border w-8 h-8" title={data.organization}/>
          : <span className={`text-2xl image border ${randomFilterClass()}`} title={data.organization}>{data.iconEmoji ? data.iconEmoji : randomEmoji()}</span>
        }
      </div>
      <div className="date"></div>
      <div className="segment">
        <span className="line"></span>
        <span className="midpoint center-mark"></span>
      </div>
      <div className="title" onClick={() => {handleClickDetail(`${import.meta.env.BASE_URL}${data.detailPage}`)}}>
        {
          data.imageScreenshots && 
            <img key={`sh-${index}`} src={`${import.meta.env.BASE_URL}${data.imageScreenshots[0]}`} alt="" className="image w-16 !h-16 mx-auto drop-shadow-[0_2px_1px_black] float-left" title={data.organization}/>
        }
        <span className="detail" title={data.title}>{data.title}</span>
        <br/>

        {
          data.stackHighlights && data.stackHighlights.map((entry, index) =>(
            <span className="stackHighlight" key={`entry-${index}`}>{entry.label}</span>
          ))
        }
      </div>
    </div>
    }
    </>
  );
};

export default GroupSegment;