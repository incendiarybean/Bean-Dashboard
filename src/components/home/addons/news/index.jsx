import React from 'react';
import { Article } from './addon';

function Component(props){

    const Provider = () => {
        if(!props.News.Loaded){
            return <props.Loading {...props} name='Articles'/>;
        } else if (props.News.Loaded === 'Failed') {
            return <props.Failed/>;
        } else {
            return <props.Loaded {...props} name='PC Gamer' url='https://www.pcgamer.com/' />;
        }
    };

    return (
        <div className='animate__animated animate__fadeIn w-full h-auto'>
            <div className='px-4 pt-2 flex justify-between'>
                <div className='flex-1'>
                    <h1 className='p-2  font-semi-bold'>News</h1>
                    <hr className='border-default w-full'/>
                </div>
                <Provider />
            </div>
            {(props.News.Articles.length > 0 && props.Weather.Loaded !== 'Failed') ?
                <div className='w-full h-auto max-h-full overflow-visible xl:overflow-x-auto'>
                    <div id='articles_container' className='articles w-full sm:h-full xl:w-screen flex flex-col xl:flex-row px-4 mb-2'>
                        {props.News.Articles.map((data) => (
                            <Article key={data.title} {...props} data={data} />
                        ))}
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );

}

export default Component;