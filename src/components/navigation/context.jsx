import React, { useEffect , useState} from 'react';

const Menu = (props) => {

    const [X, setX] = useState('0px');
    const [Y, setY] = useState('0px');
    const [Target, setTarget] = useState('');
    const [TargetEl, setTargetEl] = useState('');
    const [Link, setLink] = useState('');
    const [CopyFN, setCopy] = useState(false);
    const [PasteFN, setPaste] = useState(false);
    const [MenuFN, setMenu] = useState(false);

    const openMenu = (e) => {
        e.preventDefault();
        setX(`${e.pageX}px`);
        setY(`${e.pageY}px`);
        setMenu(true);
        switch(e.target.id){
            case 'notes_container':
                return setTarget('notes_container');
            case 'articles_container':
                return setTarget('article');
            default:
                if(e.target.parentNode.closest('div').classList.contains('note')){
                    setTargetEl(e.target.closest('div'));
                    return setTarget('note');
                }
                else setLink(e.target.parentNode.closest('a'));
        }
    };
    const closeMenu = () => {
        setTarget('');
        return setMenu(false);
    };
    const highlight = (e) => {
        let text = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
        if(text.length > 0) setCopy(true);
        else return setCopy(false);
    };
    const getText = (e) => {
        e.preventDefault();
        let text = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
        if(text.length > 0){
            navigator.clipboard.writeText(text);
            return setPaste(true);
        }
    };
    const getPaste = (e) => {
        e.preventDefault();
        navigator.clipboard.readText().then(data => {
            let item = TargetEl;
            if(item.id !== 'note_content') item = item.querySelector('#note_content');
            item.focus();
            let caret = window.getSelection();
            let text = item.innerHTML;
            let toPaste = data;
            let position = caret.focusOffset;
            let output = [text.slice(0, position), toPaste, text.slice(position)].join('');
            item.innerHTML = output;
        });
    };
    const copyLink = () => {
        return navigator.clipboard.writeText(Link.href);
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
        switch(Target){
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
                return (
                    <div>
                        <p onClick={copyLink} className='cursor-pointer block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'>Copy Link</p>
                    </div>
                );
        }
    };

    const Copy = () => {
        switch(CopyFN){
            case true:
                return (
                    <div>
                        <p onMouseDown={getText} className='cursor-pointer block px-4 py-2 text-sm text-gray-600 border-b hover:bg-gray-200'>Copy</p>
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

    const Paste = () => {
        switch(PasteFN){
            case true:
                return (
                    <div>
                        <p onMouseDown={getPaste} className='cursor-pointer block px-4 py-2 text-sm text-gray-600 border-b hover:bg-gray-200'>Paste</p>
                    </div>
                );
            default:
                return (
                    <div>
                        <p className='disabled block px-4 py-2 text-sm text-gray-400 border-b bg-gray-100'>Paste</p>
                    </div>
                );
        }
    };

    if (MenuFN) {
        return(
            <div className='absolute right-0 mt-2 w-48 bg-white rounded overflow-hidden shadow-xl z-20' style={{ top: Y, left: X }}>
                <Copy {...CopyFN} />
                <Paste {...PasteFN} />
                <Menu {...Target} />
            </div>
        );

    } else return false;

};

export default Menu;