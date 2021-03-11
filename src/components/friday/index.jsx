import React from 'react';
import {Stats, Counter} from './addons';

function Main(props){

    if(!props.Friday.Loaded){
        return <props.Loader {...{color:'purple', text:'Loading...'}}/>;
    } else if(props.Friday.Loaded === 'Failed') {
        return <props.Loader {...{color:'red', text:'Failed...'}}/>;
    } else {
        return (
            <div className='flex w-full h-full overflow-hidden'>
                <Counter {...props} />
                <Stats {...props} />
            </div>
        );
    }

}

export default Main;
