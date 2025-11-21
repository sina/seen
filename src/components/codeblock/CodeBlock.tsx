'use client';

import useResize from './hook/useResize';
import './style/codeblock.css';
import CodeLineNumbers from './CodeLineNumbers';

interface Props {
  code: string,
  thumbnail?: string,
  title?: string | "",
}

type Dimensions = {
  height: number,
  width: number
};

const generateLineNumbers = (code: string, dimensions: Dimensions) => {
  const containerWidth = dimensions.width;
  const emExcess = .108;
  const charactersInWidth = containerWidth * emExcess;
  const characterCount = code.length;
  const rawRows = charactersInWidth === 0 ? 0 : characterCount / charactersInWidth;
  const rows = Math.round(rawRows);

  console.log({containerWidth, emExcess, charactersInWidth, characterCount, rawRows, rows});
  return <CodeLineNumbers rows={rows} />
};

 const CodeBlock = ({ title, code, thumbnail } : Props) => {
  const [blockRef, dimensions] = useResize();

  return (
    <div className="overflow-hidden">
      <div className="code-block-container rounded-lg mx-2 opacity-85 float-left max-w-2/3">
        <div className="code-title rounded-t-lg py-1 px-3 italic text-sm">{title}</div>
        <div className="code-container">
          <div className="code-row">
            {
              generateLineNumbers(code, dimensions)
            }
            <div className="code p-1 pl-2 text-left" ref={blockRef}>{code}</div>
          </div>
        </div>
      </div>

      { thumbnail &&
        <div className="code-block-thumb-container float-right max-w-[30%]">
          <div className="code-title rounded-t-lg py-1 px-3 italic text-sm opacity-85">{title}</div>
          <img src={`${import.meta.env.BASE_URL}${thumbnail}`} className="border-light-steel-blue border-2 !rounded-t-none" />
        </div>
      }
      
    </div>
  );
};

export default CodeBlock;