import React, { useEffect , useState} from 'react';

const Menu = (props) => {

    const [x, setX] = useState('0px');
    const [y, setY] = useState('0px');
    const [target, setTarget] = useState('0px');
    const [link, setLink] = useState('');
    const [copy, setCopy] = useState(false);
    const [menu, setMenu] = useState(false);

    const openMenu = (e) => {
        e.preventDefault();
        setX(`${e.pageX}px`);
        setY(`${e.pageY}px`);
        setMenu(true);
        switch(e.target.parentNode.closest('div').classList.contains('note')){
            case true:
                return setTarget('note');
            default:
                switch(e.target.closest('a')){
                    case true:
                        switch(e.target.closest('a').classList.contains('article')){
                            case true:
                                setLink(e.target.closest('a'));
                                return setTarget('article');
                            default:
                                return setTarget(e.target.id);
                        }
                    default:
                        return false;
                }
        }
    };
    const closeMenu = () => {
        return setMenu(false);
    };
    const highlight = (e) => {
        let text = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
        if(text.length > 0) setCopy(true);
        else return setCopy(false);
    };
    const getText = (e) => {
        let text = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
        if(text.length > 0) return navigator.clipboard.writeText(text);
    };
    const copyLink = () => {
        return navigator.clipboard.writeText(link.href);
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        document.addEventListener('contextmenu', openMenu);
        document.addEventListener('mouseup', highlight);
        return () => {
            document.removeEventListener('click', openMenu);
            document.removeEventListener('contextmenu', openMenu);
        };
    });

    const Menu = () => {
        switch(target){
            case 'notes_container':
                return (
                    <div>
                        <p className='cursor-pointer block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'>New</p>
                    </div>
                );
            case 'note':
                return (
                    <div>
                        <p className='cursor-pointer block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'>Empty</p>
                        <p className='cursor-pointer block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'>Delete</p>
                    </div>
                );
            case 'article':
                return (
                    <div>
                        <p onClick={copyLink} className='cursor-pointer block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'>Copy Link</p>
                    </div>
                );
            default:
                return false;
        }
    };

    const Copy = () => {
        switch(copy){
            case true:
                return (
                    <div>
                        <p onClick={getText} className='block px-4 py-2 text-sm text-gray-600 border-b hover:bg-gray-200'>Copy</p>
                    </div>
                );
            default:
                return (
                    <div>
                        <p className='disabled block px-4 py-2 text-sm text-gray-400 border-b bg-gray-100'>Copy</p>
                    </div>
                );
        }
    };

    if (menu) {
        return(
            <div className='absolute right-0 mt-2 w-48 bg-white rounded overflow-hidden shadow-xl z-20' style={{ top: y, left: x }}>
                <Copy copy={copy} />
                <Menu target={target} />
            </div>
        );

    } else return false;

};

export default Menu;