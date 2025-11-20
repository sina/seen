import './style/billiard.css';
import './style/billiard-arcos.css';
import './style/billiard-ares_zeus.css';
import './style/billiard-tournament.css';

interface BilliardProps {
  count: number,
  className?: string,
  style?: object,
  design?: string,
  showcase?: boolean,
  click?: Function
}

interface RackedProps {
  style?: string,
  billiardWidth?: string,
  className?: string,
  design?: string
}

type BilliardRackSettings = {
  billiardClass?: string,
  billiardStyles?: object,
  spacerFullClass?: string,
  spacerFullStyles?: object,
  spacerHalfClass?: string,
  spacerHalfStyles?: object,
  rackClass?: string,
  rackStyles?: object
}

type RackPattern = {
  [key: string]: Array<Array<Number>>
}

enum spacer {
  HALF = -1,
  FULL = -2
};

const Billiard = ({count, className = '', style, design = 'traditional', showcase = false, click = () => {}}: BilliardProps) => {
  //designs:
  //  traditional, arcos, ares, tournament, tournament-black, zeus

  return (
    !!showcase
      ? <>
          <h6 className="text-gray!">Design: {design}</h6>
          {
            [...Array(16)].map((entry, index) => (
              <Billiard key={`${design}-showcase-${index}`} count={index} className={'float-left m-1 border-solid border-black border-2'} style={{width: `${32 + (index * 3.5)}px`}} design={design}/>
            ))
          }
        </>
      : <div className={`billiard ${className} ${design}`} data-count={count} style={style} onClick={() => click()}></div>
  );
};

const getRacked = (style: string, settings: BilliardRackSettings, design: string) => {
  const markup: React.ReactElement[] = [];
  const rackPatterns: RackPattern = {
    '8ball': [
      [spacer.FULL, spacer.FULL, 1, spacer.FULL, spacer.FULL],
      [spacer.FULL, spacer.HALF, 9, 2, spacer.HALF, spacer.FULL],
      [spacer.FULL, 5, 8, 14, spacer.FULL],
      [spacer.HALF, 10, 4, 11, 7, spacer.HALF],
      [3, 15, 6, 13, 12]
    ],
    '9ball': [
      [spacer.FULL,1,spacer.FULL],
      [spacer.HALF,2,3,spacer.HALF],
      [4,9,5],
      [spacer.HALF,6,7,spacer.HALF],
      [spacer.FULL,8,spacer.FULL]
    ]
  };

  rackPatterns[style].map((sequence: Array<any>) => {
    const sequenceLength = sequence.length;

    sequence.map((entry: number, index: number) => {
      markup.push(
        entry < -1
          ? <div key={`spacer-full-${index}`} className={'spacer full'} style={settings.spacerFullStyles}/>
          : entry < 0
            ? <div key={`spacer-half-${index}`} className={'spacer'} style={settings.spacerHalfStyles}/>
            : <Billiard key={`pool-${index}`} count={entry} style={settings.billiardStyles} design={design}/>
      );

      if ((index + 1) === sequenceLength) {
        markup.push(<div key={`newline-${index}`} className='newline clear-left' />);
      }
    });
  });

  return markup
};

const getRackSettings = (width: string, style: string): BilliardRackSettings => {
  let settings: BilliardRackSettings = {};
  //width in rem
  width = width.replace('rem', '');
  let widthValue = Number(width);
    settings.billiardStyles = {
      float: 'left',
      width: `${widthValue}rem`
    };
    settings.spacerFullStyles = {
      'aspect-ratio': '1 / 1',
      float: 'left',
      width: `${widthValue}rem`
    };
    settings.spacerHalfStyles = {
      'aspect-ratio': '1 / 1',
      float: 'left',
      width: `${widthValue/2}rem`
    };

    if (style === '8ball') {
      settings.rackStyles = {
        width: `${(widthValue * 8) - 1}rem`,
        height: `${(widthValue * 6) + 1}rem`,
        left: `${(widthValue * -(9/16)) + .5}rem`,
        top: `${(widthValue * -(9/16)) - .5}rem`
      };
    } else {
      settings.rackStyles = {
        width: `${(widthValue * 5) - 1}rem`,
        height: `${(widthValue * 9) - 1}rem`,
        left: `${(widthValue * -.6) +.35}rem`,
        top: `${(widthValue * -2) + .5}rem`
      };
    }

  return settings;
};

const Racked = ({style = '8ball', className, billiardWidth = '5rem', design = 'traditional'}: RackedProps) => {
  const settings = getRackSettings(billiardWidth, style);
  return (
    
    <div className={`rack-box ${className}`}>
      {getRacked(style, settings, design)}
      <div className={`rack ${className}`} style={settings.rackStyles}></div>
    </div>
  );
};

export {Billiard, Racked};