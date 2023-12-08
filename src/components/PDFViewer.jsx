import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { searchPlugin } from '@react-pdf-viewer/search';
import { useState, useEffect } from 'react';

const PDFViewer = ({workerUrl, fileUrl, onDocumentLoad}) => {
    const [isDocumentLoaded, setDocumentLoaded] = useState(false);
    const [ value, setValue ] = useState('操作')

    const searchPluginInstance = searchPlugin({
        // keyword: value,
    })
    const { highlight} = searchPluginInstance;
    
    const handleDocumentLoad = () => {
        setDocumentLoaded(true);
        onDocumentLoad && onDocumentLoad();
    };

    useEffect(() => {
        if (isDocumentLoaded) {
            highlight(value);
        }
    }, [isDocumentLoaded, value]);


    return <Worker workerUrl={workerUrl}>
            <input type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
            <button onClick={() => {
                if(!isDocumentLoaded){
                    return
                }
                highlight(value);
            }}>highlight</button>
            <div style={{width: '1000px', height: '600px', overflow: 'scroll'}}>
                <Viewer onDocumentLoad={handleDocumentLoad}  key={0} fileUrl={fileUrl} plugins={[searchPluginInstance]} />
            </div>
        </Worker>
}

export default PDFViewer