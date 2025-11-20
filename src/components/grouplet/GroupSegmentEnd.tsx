type Props = {
  index: number
  pathType: string
}

const GroupSegmentEnd = ({ pathType, index }: Props) => {
  return (
    <>
    {
      pathType === 'standard'
      ?
        <div className="segment w-[1vw] h-24 float-left" data-index={index}>
          <div className={`segment-end ${pathType} w-[1.25vw] absolute`}></div>
        </div>
      : pathType === 'spacer'
        ?
          <div className={`segment ${pathType} h-24`} data-index={index}>
            <div className={`segment-end ${pathType}`}></div>
          </div>
        :
          <div className={`segment ${pathType} h-24`} data-index={index}>
            <div className={`segment-end ${pathType}`}></div>
          </div>
    }
    </>
  );
};

export default GroupSegmentEnd;
