import { useRef, useState, useEffect } from 'react';
import currentDevice from 'current-device';

import IconCheck from '@/icons/IconCheck';
import IconXmark from '@/icons/IconXmark';

const valueMap = {
  string: (key) => currentDevice[key],
  function: (key) => currentDevice[key](),
};

const App = () => {
  const fileInput = useRef();

  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState('-');

  useEffect(() => {
    const arr = [];
    for (const key in currentDevice) {
      if (
        key !== 'cordova' &&
        key !== 'noConflict' &&
        key !== 'onChangeOrientation'
      ) {
        let val = valueMap[typeof currentDevice[key]](key);
        if (typeof val === 'string') {
          val = <span>{val}</span>;
        }
        if (typeof val === 'boolean' && val) {
          val = <IconCheck width="32px" height="32px" fill="#31b27c" />;
        }
        if (typeof val === 'boolean' && !val) {
          val = <IconXmark width="32px" height="32px" fill="#aa0d31" />;
        }
        arr.push({ key, val });
      }
    }
    setData(arr);
  }, []);

  return (
    <>
      <div className="scrolling-wrapper">
        <button
          type="button"
          className="scrolling-button"
          onClick={() => {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'relative';
          }}
        >
          <p>Stop</p>
        </button>
        <button
          type="button"
          className="scrolling-button"
          onClick={() => {
            document.body.style.overflow = '';
            document.body.style.position = '';
          }}
        >
          <p>Resume</p>
        </button>
      </div>

      <div className="file-input-wrapper">
        <label htmlFor="image-only" style={{ borderColor: '#38bdf8' }}>
          Image Only
        </label>
        <input id="image-only" type="file" accept="image/png, image/jpeg" />
      </div>

      <div className="file-input-wrapper">
        <label htmlFor="video-only" style={{ borderColor: '#f9a8d4' }}>
          Video Only
        </label>
        <input
          id="video-only"
          type="file"
          accept="video/mp4, video/quicktime"
        />
      </div>

      <div className="file-input-wrapper">
        <label
          className="file-input-label"
          htmlFor="file-input"
          style={{ borderColor: '#c4b5fd' }}
        >
          File Type
        </label>
        <input
          type="file"
          id="file-input"
          ref={fileInput}
          onChange={() => {
            setFileType(fileInput.current.files[0].type);
            fileInput.current.value = '';
          }}
        />
      </div>

      <p>file type：{fileType}</p>

      {data.reverse().map((item) => (
        <p key={item.key}>
          {item.key}：{item.val}
        </p>
      ))}
    </>
  );
};

export default App;
