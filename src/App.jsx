import { useState, useEffect } from 'react';
import currentDevice from 'current-device';

import IconCheck from '@/icons/IconCheck';
import IconXmark from '@/icons/IconXmark';

const App = () => {
  const [data, setData] = useState([]);

  const valMap = {
    string: (key) => currentDevice[key],
    function: (key) => currentDevice[key](),
  };

  const reorgData = () => {
    const arr = [];
    for (const key in currentDevice) {
      if (
        key !== 'cordova' &&
        key !== 'noConflict' &&
        key !== 'onChangeOrientation'
      ) {
        let val = valMap[typeof currentDevice[key]](key);
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
  };

  useEffect(() => {
    reorgData();
  }, []);

  return (
    <>
      {data.reverse().map((item) => (
        <p key={item.key}>
          {item.key}：{item.val}
        </p>
      ))}
    </>
  );
};

export default App;
