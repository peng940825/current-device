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
      <div className="file-input-wrapper">
        <label className="file-input-label" htmlFor="file-input">
          Upload
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
      <p>File Type：{fileType}</p>

      {data.reverse().map((item) => (
        <p key={item.key}>
          {item.key}：{item.val}
        </p>
      ))}
    </>
  );
};

export default App;
