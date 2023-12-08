import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { searchPlugin } from '@react-pdf-viewer/search';
import { useState, useRef } from 'react';
const App = () => {
    const [isDocumentLoaded, setDocumentLoaded] = useState(false);
    const [ value, setValue ] = useState('操作')

    const searchPluginInstance = searchPlugin({
        // keyword: value,
    })
    const { highlight, jumpToNextMatch, jumpToPreviousMatch, setTargetPages } = searchPluginInstance;
    
    const handleDocumentLoad = () => setDocumentLoaded(true);

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <input type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
            <button onClick={() => {
                if(!isDocumentLoaded){
                    return
                }
                highlight(value);
            }}>highlight</button>
            <button onClick={() => {
                jumpToPreviousMatch()
            }}>prev</button>
            <button onClick={() => {
                jumpToNextMatch()
            }}>next</button>
            <button onClick={() => {
                setTargetPages(1)
            }}>setTargetPages</button>

            <div style={{width: '1000px', height: '600px', overflow: 'scroll'}}>
                <Viewer  onDocumentLoad={handleDocumentLoad}  key={0} fileUrl="/document2.pdf" plugins={[searchPluginInstance]} />
            </div>
        </Worker>
    );
};

export default App;
