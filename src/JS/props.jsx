import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import image from '../IMG/background.png';
import * as icons from './icons.js';

if(process.env.NODE_ENV === 'development') console.log(process.env);

function RenderProps(socket) {
    let timer = 0;

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(false);
    const [WeatherLoaded, setWeatherLoaded] = useState(false);
    const [NotesLoaded, setNotesLoaded] = useState(false);
    const [ThemeLoaded, setThemeLoaded] = useState(false);
    const [NewsLoaded, setNewsLoaded] = useState(false);
    const [FridayLoaded, setFridayLoaded] = useState(false);
    const [SandstormLoaded, setSandstormLoaded] = useState(false);
    const [DiscordLoaded, setDiscordLoaded] = useState(false);

    const [Note, setNote] = useState([]);
    const [DailyWeather, setDailyWeather] = useState([]);
    const [TodayWeather, setTodayWeather] = useState('');
    const [Location, setLocation] = useState('');
    const [Articles, setArticles] = useState([]);
    const [Dates, setDates] = useState([]);
    const [Wins, setWins] = useState([]);
    const [Losses, setLosses] = useState([]);
    const [TodayWins, setTodayWins] = useState(0);
    const [TodayLosses, setTodayLosses] = useState(0);
    const [Search, setSearch] = useState({});
    const [SandstormUserCount, setSandstormUserCount] = useState([1]);
    const [SandstormUser, setSandstormUser] = useState([]);
    const [Discord, setDiscord] = useState([]);

    const props = {
        UserInfo: user,
        icons: icons,
        animateCSS: (element, animation, prefix = 'animate__') => {
            // We create a Promise and return it
            return new Promise((resolve, reject) => {
                const animationName = `${prefix}${animation}`;

                let node;
                if(typeof(element) === 'string'){
                    node = document.querySelector(element);
                } else {
                    node = element;
                }

                node.classList.add(`${prefix}animated`, animationName);

                // When the animation ends, we clean the classes and resolve the Promise
                const handleAnimationEnd = (event) => {
                    event.stopPropagation();
                    node.classList.remove(`${prefix}animated`, animationName);
                    resolve('Animation ended');
                };

                node.addEventListener('animationend', handleAnimationEnd, {once: true});
            });
        },
        Failed: () => {
            return (
                <div className='p-2 flex-initial'>
                    <div className='w-full inline-flex text-coolGray-800 dark:text-white bg-white dark:bg-coolGray-700 leading-none rounded-full p-2 shadow text-sm'>
                        <icons.Failed/>
                        <p className='flex items-center hover:text-blue-500 underline name inline-flex px-2 '>Failed.</p>
                    </div>
                </div>
            );
        },
        Loading: (props) => {
            return (
                <div className='p-2 flex-initial'>
                    <span className='w-full inline-flex text-coolGray-800 dark:text-white bg-white dark:bg-coolGray-700 leading-none rounded-full px-4 py-2 shadow text-sm' disabled=''>
                        <icons.LoaderSmall/>
                        <p className='flex items-center hover:text-blue-500 underline name inline-flex px-2 '>Loading {props.name}...</p>
                    </span>
                </div>
            );
        },
        Loaded: (props) => {
            return (
                <div className='p-2 flex-initial'>
                    <div className='w-full inline-flex text-coolGray-800 dark:text-white bg-white dark:bg-coolGray-700 leading-none rounded-full p-2 shadow text-sm'>
                        <icons.Info/>
                        <a rel="noreferrer" target="_blank" href={props.url} className='flex items-center cursor-pointer hover:text-blue-500 underline name inline-flex px-2 '>Provided by {props.name}.</a>
                    </div>
                </div>
            );
        },
        Loader: (props) => {
            return (
                <div className='flex w-full h-full overflow-hidden'>
                    <div className='shadow-inner bg-coolGray-700 w-full p-2 flex justify-center items-center'>
                        <div className={`-mt-20 animate__animated animate__flash animate__infinite animate__slower shadow absolute w-96 rounded-lg border border-${props.color}-400`}>
                            <div className={`note relative rounded-t-lg w-full p-1 flex justify-between border-b border-${props.color}-400`}>
                                <p className={`font-semi-bold leading-wide px-2 text-${props.color}-400`}>{props.text}</p>
                                <svg height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'><circle className={`stroke-current text-${props.color}-400`} cx='10.5' cy='10.5' fill='none' r='8' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/></svg>
                            </div>
                            <div id='note_content' className='h-56 note p-2'>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
        showChild: (e) => {
            let target = e.target;
            let trigger = false;
            while(!trigger){
                target = target.parentElement;
                if(target.nodeName === 'DIV') trigger = true;
            }
            target.parentElement.children[1].classList.toggle('hidden');
            target.parentElement.querySelectorAll('#up')[0].classList.toggle('hidden');
            target.parentElement.querySelectorAll('#down')[0].classList.toggle('hidden');
        },
        drag: (el) => {
            let child;
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const startDrag = (e) => {
                if(e.button === 0){
                    var event = new Event('dragstart');
                    child.dispatchEvent(event);
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    if(!el.classList.contains('absolute')){
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        el.style.top = (el.offsetTop - pos2) + 'px';
                        el.style.left = (el.offsetLeft - pos1) + 'px';
                        el.classList.add('absolute');
                    }
                    document.onmouseup = endDrag;
                    document.onmousemove = dragging;
                }
            };
            const dragging = (e) => {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                el.style.top = `${(el.offsetTop - pos2)}px`;
                el.style.left = `${(el.offsetLeft - pos1)}px`;
            };
            const endDrag = () => {
                var event = new Event('dragend');
                el.dispatchEvent(event);
                document.onmouseup = null;
                document.onmousemove = null;
            };
            if(el){
                for(child in el.children){
                    child = el.children[child];
                    if(!el.attributes.drag) return;
                    if(el.attributes.drag.value === 'true'){
                        child.onmousedown = startDrag;
                    }
                    return child;
                }
            }
        },
        error: (message) => {
            toast.error(message, {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        },
        custom: (message) => {
            toast.dark(message, {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
        info: (message) => {
            toast.info(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        },
        success: (message) => {
            toast.success(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        },
        Theme: {
            Loaded: ThemeLoaded,
            background: image,
            setColor: (colour) => {
                let prev = window.localStorage.getItem('colour');
                document.getElementById('root').classList.remove(`accent-${prev}`);
                document.getElementById(`set-${prev}`).classList.remove('border-2');
                window.localStorage.setItem('colour', colour);
                document.getElementById(`set-${colour}`).classList.add('border-2');
                document.getElementById('root').classList.add(`accent-${colour}`);

                return true;
            },
            setTheme: () => {
                let prev = window.localStorage.getItem('theme');
                switch(prev){
                    case 'light':
                        window.localStorage.setItem('theme', 'dark');
                        document.getElementById('root').classList.remove('light', 'dark');
                        return document.getElementById('root').classList.add('dark');
                    case 'dark':
                        window.localStorage.setItem('theme', 'light');
                        document.getElementById('root').classList.remove('light', 'dark');
                        return document.getElementById('root').classList.add('light');
                    default:
                        window.localStorage.setItem('theme', 'light');
                        document.getElementById('root').classList.remove(`dark`, `light`);
                        return document.getElementById('root').classList.add(`light`);
                }
            },
            menu: () => {
                let links = document.querySelectorAll('.linklist');
                for(let link in links) {
                    let item = links[link];
                    if(typeof(item) === 'object'){
                        item.classList.remove('animate__fadeIn', 'animate__fadeOut');
                        if(item.classList.contains('hidden')){
                            return item.classList.toggle('hidden', false);
                        } else {
                            return item.classList.toggle('hidden', true);
                        }
                    }
                }
            }
        },
        Search: {
            Results: Search,
            keyIterator: 0,
            Google: () => {
                props.Search.keyIterator = props.Search.keyIterator + 1;
                if (props.Search.keyIterator > 2) {
                    let q = document.getElementById('search').value;
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/search?q=${encodeURIComponent(q)}`)
                    .then(data => data.json())
                    .then(data => {
                        setSearch(data);
                        if(data.length > 0) {
                            document.getElementById('quick-search').classList.remove('hidden');
                        } else {
                            document.getElementById('quick-search').classList.add('hidden');
                        }
                    })
                    .catch(e => {
                        return props.error(e);
                    });
                }
            },
            ButtonSearch: () => {
                props.Search.keyIterator = 3;
                props.Search.Google();
            },
            setKeyIterator: () => {
                props.Search.keyIterator = 0;
            },
            hideSearch: () => {
                document.getElementById('quick-search').classList.add('hidden');
            }
        },
        Weather: {
            DailyWeather: DailyWeather,
            TodayWeather: TodayWeather,
            Location: Location,
            Loaded: WeatherLoaded,
        },
        News: {
            Articles: Articles,
            Loaded: NewsLoaded,
        },
        Notes: {
            Note: Note,
            Loaded: NotesLoaded,
            element: (id) => {
                return document.getElementById(id);
            },
            getTarget: (note) => {
                let content = document.getElementById(note._id).querySelector('#note_content').innerHTML;
                content.replace(/(?:\r\n|\r|\n)/g, '<br>');
                let obj = {
                    'top':document.getElementById(note._id).offsetTop,
                    'left':document.getElementById(note._id).offsetLeft,
                    'title':'eh',
                    'content':encodeURIComponent(content),
                    'color':note.color,
                    'author': note.author,
                    'lastModified': note.lastModified,
                    'notification': note.notification ? note.notification : null
                };
                return obj;
            },
            color: (note, color) => {
                note.color = color;
                props.Notes.log(props.Notes.getTarget(note), note);
                setNote(Note.map(data => {
                    if (note._id === data._id) {
                        data.color = note.color;
                    }
                    return data;
                }));
            },
            showSettings: (note) => {
                let current_note = document.getElementById(note._id);
                let current_note_settings = current_note.querySelectorAll('#settings')[0];
                let current_note_settings_hidden = current_note.querySelectorAll('#settings')[0].classList.contains('hidden');
                
                if(!current_note_settings_hidden){
                    props.animateCSS(current_note_settings, 'fadeOut')
                    .then(() => {
                        current_note_settings.classList.add('hidden');
                    });
                } else {
                    props.animateCSS(current_note_settings, 'fadeIn');
                    current_note_settings.classList.remove('hidden');
                }
            },
            logChange: (e, note) => {
                e.persist();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    props.Notes.log(props.Notes.getTarget(note), note);
                    return props.custom('💠 Updating Note!');
                }, 2000);
            },
            log: async (obj, note) => {
                return fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky/${note._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(() => {
                    props.custom('💠 Saved Note!');
                    return socket.emit('STICKY_UPDATE');
                })
                .catch(e => {
                    console.log(e);
                });
            },
            saveNotification: (e, note) => {
                console.log(new Date(e.target.value).toISOString());
                note.notification = new Date(e.target.value).toISOString();
                props.Notes.logChange(e, note);
            },
            createNote: async (e) => {
                if(e.target.id !== 'notes_container') return;
                let rect = e.target.getBoundingClientRect();
                let x = e.clientX - rect.left - 10;
                let y = e.clientY - rect.top - 10;
                fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(data => data.json())
                .then(data => {
                    let id = data.item._id;
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky/${id}`)
                    .then(data => data.json())
                    .then(data => {
                        const note = data.item;
                        note.left = x;
                        note.top = y;
                        fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(note)
                        })
                        .then(data => data.json())
                        .then(data => {
                            props.custom('💠 Creating new note.');
                            note.author = data.item.ops[0].author;
                            note.lastModified = data.item.ops[0].lastModified;
                            return setNote(Note => [...Note, note]);
                        })
                        .catch(e => {
                            props.error(e.toString());
                        });
                    })
                    .catch(e => {
                        props.error(e.toString());
                    });
                })
                .catch(e => {
                    props.error(e.toString());
                });
            },
            deleteNote: async (element, note) => {
                document.getElementById('notes_container').removeChild(element);
                fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky/${note._id}`, {
                    method: 'DELETE'
                })
                .then(data => data.json())
                .then(() => {
                    props.custom('💠 Deleted Note!');
                    element.removeEventListener('dragend', element);
                    props.animateCSS(element, 'fadeOut')
                    .then(() => {
                        let new_notes_arr = [];
                        new_notes_arr = Note.filter((data) => {
                            if(data._id === note._id){
                                return false;
                            } else return true;
                        });
                        return setNote(new_notes_arr);
                    });
                })
                .catch(e => {
                    console.log(e.toString());
                    props.error('Couldn\'t delete Note!');
                });
            }
        },
        Friday: {
            Loaded: FridayLoaded,
            Today:{
                Wins: TodayWins,
                Losses: TodayLosses,
                addWin: () => {
                    setWins(Wins.map((item, index) => {
                        if(index === Wins.length - 1){
                            item = TodayWins + 1;
                        }
                        return item;
                    }));
                    setTodayWins(TodayWins + 1);
                },
                removeWin: () => {
                    setWins(Wins.map((item, index) => {
                        if(index === Wins.length - 1){
                            item = TodayWins - 1;
                        }
                        return item;
                    }));
                    setTodayWins(TodayWins - 1);
                },
                addLoss: () => {
                    setLosses(Losses.map((item, index) => {
                        if(index === Losses.length - 1){
                            item = TodayLosses + 1;
                        }
                        return item;
                    }));
                    setTodayLosses(TodayLosses + 1);
                },
                removeLoss: () => {
                    setLosses(Losses.map((item, index) => {
                        if(index === Losses.length - 1){
                            item = TodayLosses - 1;
                        }
                        return item;
                    }));
                    setTodayLosses(TodayLosses - 1);
                },
            },
            Dates: Dates,
            Wins: Wins,
            Losses: Losses
        },
        Sandstorm: {
            Players: SandstormUserCount,
            addPlayer: () => {
                if(SandstormUserCount.length < 4){
                    setSandstormUserCount([...SandstormUserCount, (SandstormUserCount.length + 1)]);
                } else {
                    props.error('You\'ve reached the max players.');
                }
            },
            removePlayer: (user) => {
                if(SandstormUserCount.length > 1){
                    setSandstormUserCount(SandstormUserCount.filter((item, index) => (SandstormUserCount.length -1) !== index));
                } else {
                    props.error('You need at least one player.');
                }
            },
            generate: () => {
                setSandstormUser(SandstormUser => SandstormUser = []);
                SandstormUserCount.map(user => {
                    return fetch('https://sandstorm-api.local/sandstorm/loadout')
                    .then(data => data.json())
                    .then(data => {
                        return setSandstormUser(SandstormUser => [...SandstormUser, data]);
                    })
                    .catch(e => {
                        return props.error(e);
                    });
                });
            },
            reset: () => {
                setSandstormUser(SandstormUser => SandstormUser = []);
                setSandstormLoaded(true);
            },
            Loaded: SandstormLoaded,
            users: SandstormUser
        },
        Discord: {
            Group: Discord,
            Loaded: DiscordLoaded,
        },
        checkPassword: (p) => {
            let mustMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(p.match(mustMatch)) return true;
            else return false;
        },
        Authed: loggedIn,
        Login: (e) => {
            e.preventDefault();
            let items = document.getElementById(e.target.id).querySelectorAll('input');
            let userObject = {};
            let valid = true;

            items.forEach(async element => {
                if(!element.value || element.value === '') valid = false;
                userObject[element.id] = element.value;
                if(element.id === 'password'){
                    let isOk = await props.checkPassword(element.value);
                    if(!isOk && valid) return props.error('Please make sure your password meets the criteria!');
                }
            });

            if(!valid) return props.error('Please be sure to complete the form.');

            fetch(`https://${process.env.REACT_APP_HOST}/login`, {
                method: 'POST',
                body: JSON.stringify(userObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(data => {
                setUser(data.user);
                return setLoggedIn(true);
            })
            .catch(e => {
                setLoggedIn(false);
                props.error('Username or Password is incorrect.');
            });
        },
        SignUp: (e) => {
            e.preventDefault();
            let items = document.getElementById(e.target.id).querySelectorAll('input');
            let userObject = {};

            items.forEach(async element => {
                userObject[element.id] = element.value;
                if(element.id === 'password'){
                    let isOk = await props.checkPassword(element.value);
                    if(!isOk) return props.error('Please make sure your password meets the criteria!');
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/auth/create`, {
                        method: 'POST',
                        body: JSON.stringify(userObject)
                    })
                    .then(data => data.json())
                    .then(data => {
                        props.info('Account Creation Success.');
                        fetch(`https://${process.env.REACT_APP_HOST}/login`, {
                            method: 'POST',
                            body: JSON.stringify({username: userObject.username, password: userObject.password}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(data => data.json())
                        .then(data => {
                            setUser(data.user);
                            return setLoggedIn(true);
                        })
                        .catch(e => {
                            setLoggedIn(false);
                            props.error(e);
                        });
                    })
                    .catch(e => {
                        props.error(e);
                    });
                }
            });
        }
    };

    useEffect(() => {
        
        const initTheme = () => {
            if(!window.localStorage.getItem('theme') || !window.localStorage.getItem('colour')){
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    window.localStorage.setItem('theme', 'dark');
                    window.localStorage.setItem('colour', 'blue');
                    document.getElementById('root').classList.add(`dark`, `accent-blue`);
                    document.getElementById('toggle').checked = true;
                } else {
                    window.localStorage.setItem('theme', 'light');
                    window.localStorage.setItem('colour', 'purple');
                    document.getElementById('root').classList.add(`light`, `accent-purple`);
                    document.getElementById('toggle').checked = false;
                }
            } else {
                let theme = window.localStorage;
                document.getElementById('root').classList.add(`${theme.theme}`);
                if(theme.colour === 'null' && theme.theme === 'light') theme.colour = 'purple';
                if(theme.colour === 'null' && theme.theme === 'dark') theme.colour = 'blue';
                document.getElementById('root').classList.add(`accent-${theme.colour}`);
                if (document.getElementById('toggle') && theme.theme === 'dark') document.getElementById('toggle').checked = true;
                if(document.getElementById(`set-${theme.colour}`)) {
                    document.getElementById(`set-${theme.colour}`).classList.add('border-2');
                }
            }

            setThemeLoaded(true);

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const newColorScheme = e.matches ? 'dark' : 'light';
                document.getElementById('root').classList.remove('light', 'dark');
                window.localStorage.setItem('theme', `${newColorScheme}`);
                document.getElementById('root').classList.add(`${newColorScheme}`);
            });

            let dropdowns = document.querySelectorAll('.started-container');
            for(let drop in dropdowns){
                drop = dropdowns[drop];
                if(typeof(drop)!== 'object') return;
                drop.addEventListener('mouseover', () => {
                    drop.children[1].style.display = 'block';
                });
                drop.addEventListener('mouseleave', () => {
                    drop.children[1].style.display = 'none';
                });
            }

            return true;
        };

        initTheme();

        switch(true){
            case !!user.username: {
                const weatherIcons = (weatherType, desc) => {
                    let todayWeather;
                    let weatherDesc = desc;
                    switch(weatherType){
                        case 'cloud':
                            todayWeather = <props.icons.Cloud/>;
                            return {todayWeather, weatherDesc};
                        case 'sun':
                            todayWeather = <props.icons.Sun/>;
                            return {todayWeather, weatherDesc};
                        case 'rain':
                            todayWeather = <props.icons.Rain/>;
                            return {todayWeather, weatherDesc};
                        case 'snow':
                            todayWeather = <props.icons.Snow/>;
                            return {todayWeather, weatherDesc};
                        case 'thunder':
                            todayWeather = <props.icons.Thunder/>;
                            return {todayWeather, weatherDesc};
                        case 'foggy':
                            todayWeather = <props.icons.Foggy/>;
                            return {todayWeather, weatherDesc};
                        case 'error':
                            todayWeather = <props.icons.Error/>;
                            weatherDesc = `${desc.code} : ${desc.message}`;
                            return {todayWeather, weatherDesc};
                        default:
                            return({todayWeather:'todayWeather', weatherDesc:'weatherDesc'});
                    }
                };

                const weatherCode = async (code) => {
                    switch(code){
                        case 0:
                            return await weatherIcons('sun', 'Clear night');
                        case 1:
                            return await weatherIcons('sun', 'Sunny day');
                        case 2:
                            return await weatherIcons('cloud', 'Partly cloudy (night)');
                        case 3:
                            return await weatherIcons('cloud', 'Partly cloudy (day)');
                        case 4:
                            return console.log('Not used');
                        case 5:
                            return await weatherIcons('foggy', 'Mist');
                        case 6:
                            return await weatherIcons('foggy', 'Fog');
                        case 7:
                            return await weatherIcons('cloud', 'Cloudy');
                        case 8:
                            return await weatherIcons('cloud', 'Overcast');
                        case 9:
                            return await weatherIcons('rain', 'Light rain shower (night)');
                        case 10:
                            return await weatherIcons('rain', 'Light rain shower (day)');
                        case 11:
                            return await weatherIcons('rain', 'Drizzle');
                        case 12:
                            return await weatherIcons('rain', 'Light rain');
                        case 13:
                            return await weatherIcons('rain', 'Heavy rain shower (night)');
                        case 14:
                            return await weatherIcons('rain', 'Heavy rain shower (day)');
                        case 15:
                            return await weatherIcons('rain', 'Heavy rain');
                        case 16:
                            return await weatherIcons('snow', 'Sleet shower (night)');
                        case 17:
                            return await weatherIcons('snow', 'Sleet shower (day)');
                        case 18:
                            return await weatherIcons('snow', 'Sleet');
                        case 19:
                            return await weatherIcons('snow', 'Hail shower (night)');
                        case 20:
                            return await weatherIcons('snow', 'Hail shower (day)');
                        case 21:
                            return await weatherIcons('snow', 'Hail');
                        case 22:
                            return await weatherIcons('snow', 'Light snow shower (night)');
                        case 23:
                            return await weatherIcons('snow', 'Light snow shower (day)');
                        case 24:
                            return await weatherIcons('snow', 'Light snow');
                        case 25:
                            return await weatherIcons('snow', 'Heavy snow shower (night)');
                        case 26:
                            return await weatherIcons('snow', 'Heavy snow shower (day)');
                        case 27:
                            return await weatherIcons('snow', 'Heavy snow');
                        case 28:
                            return await weatherIcons('thunder', 'Thunder shower (night)');
                        case 29:
                            return await weatherIcons('thunder', 'Thunder shower (day)');
                        case 30:
                            return await weatherIcons('thunder', 'Thunder');
                        default:
                            return console.log('No handler for that response');
                    }
                };

                const setDate = (date) => {
                    date = new Date(date);
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                    let dayPrefix = date.getDate();
                    switch(dayPrefix){
                        case 1:
                            return `${days[date.getDay()]} ${dayPrefix}st, ${months[date.getMonth()]}`;
                        case 2:
                            return `${days[date.getDay()]} ${dayPrefix}nd, ${months[date.getMonth()]}`;
                        case 3:
                            return `${days[date.getDay()]} ${dayPrefix}rd, ${months[date.getMonth()]}`;
                        default:
                            return `${days[date.getDay()]} ${dayPrefix}th, ${months[date.getMonth()]}`;
                    }
                };

                const getWeather = async () => {
                    let params = new URLSearchParams({date: 'daily'});
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/weather?${params}`)
                    .then(data => data.json())
                    .then(data => {
                        setTodayWeather(TodayWeather => TodayWeather = []);
                        setDailyWeather(DailyWeather => DailyWeather = []);
                        setLocation(data.location);
                        data.items.features[0].properties.timeSeries.map( async data => {
                            data.Day = setDate(data.time);
                            data.MaxTemp = `${Math.round(data.dayMaxScreenTemperature)}º`;
                            data.LowTemp = `${Math.round(data.nightMinScreenTemperature)}º`;
                            data.MaxFeels = `${Math.round(data.dayMaxFeelsLikeTemp)}º`;
                            data.Wind = Math.round(data.midnight10MWindGust);
                            let desc = await weatherCode(data.daySignificantWeatherCode);
                            data.Icon = desc.todayWeather;
                            data.Description = desc.weatherDesc;
                            if (new Date(data.time).toDateString() === new Date().toDateString()) {
                                setTodayWeather(data);
                            }
                            return setDailyWeather(DailyWeather => [...DailyWeather, data]);
                        });
                        setWeatherLoaded(true);
                    })
                    .catch(e => {
                        console.log(e);
                        setWeatherLoaded('Failed');
                    });
                };

                const getNotes = async () => {
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky`)
                    .then(data => data.json())
                    .then(data => {
                        setNote(data.items);
                        setNotesLoaded(true);
                    })
                    .catch(e => {
                        setNotesLoaded('Failed');
                    });
                };

                const getDiscord = () => {
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/discord/prochoice`)
                    .then(data => data.json())
                    .then(data => {
                        setDiscord(Discord => Discord = []);
                        setDiscord(Discord => [...Discord, data]);
                        setDiscordLoaded(true);
                    })
                    .catch(e => {
                        console.log(e);
                        setDiscordLoaded('Failed');
                    });
                };

                const getNews = async () => {
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/news`)
                    .then(data => data.json())
                    .then(data => {
                        setArticles(Articles => Articles = []);
                        data.items.map(data => {
                            let html = data;
                            let newLink = document.createElement('p');
                            newLink.innerHTML = html;
                            let isLink = newLink.firstChild.classList.contains('article-link');
                            if(isLink && newLink.children[0] !== undefined){
                                let img = newLink.children[0].childNodes[1].childNodes[1].children[0].attributes[1].nodeValue;
                                img = img.split(':');
                                img = 'https://'+img[1];
                                let articleName = newLink.children[0].ariaLabel;
                                let linkName = newLink.firstChild.href;
                                let site = linkName.split('/')[2];
                                let date = newLink.children[0].childNodes[1].lastElementChild.childNodes[1].lastElementChild.lastElementChild.attributes['datetime'].value;
                                date = date.split('T')[0];
                                let obj = {
                                    title: articleName,
                                    img: img,
                                    link: linkName,
                                    site: site,
                                    date: date
                                };
                                setArticles(Articles => [...Articles, obj]);
                            }
                            return true;
                        });

                        setNewsLoaded(true);
                    })
                    .catch(e => {
                        setNewsLoaded('Failed');
                    });
                };

                const getFriday = () => {
                    fetch(`https://${process.env.REACT_APP_HOST}/api/v0/friday`)
                    .then(data => data.json())
                    .then(data => {

                        if(data.itemsLength === 1){
                            data.items = [data.items];
                        }

                        setDates(Dates => Dates = []);
                        setWins(Wins => Wins = []);
                        setLosses(Losses => Losses = []);

                        data.items.map(data => {
                            setDates(Dates => [...Dates, data.date]);
                            setWins(Wins => [...Wins, data.win]);
                            setLosses(Losses => [...Losses, data.loss]);
                            if(data.date === new Date().toLocaleDateString()) {
                                setTodayWins(data.win);
                                setTodayLosses(data.loss);
                            }
                            return true;
                        });

                        setFridayLoaded(true);
                    })
                    .catch(e => {
                        console.log(e);
                        setFridayLoaded('Failed');
                    });
                };

                const getSandstorm = () => {
                    setSandstormLoaded(true);
                };

                getDiscord();
                getNews();
                getWeather();
                getNotes();
                getFriday();
                getSandstorm();

                socket.on('disconnect', () => {
                    setNewsLoaded(false);
                    setWeatherLoaded(false);
                    setNotesLoaded(false);
                    window.location.href = '/';
                });

                socket.on('NEWS', () => {
                    setNewsLoaded(false);
                    getNews();
                });
                socket.on('FRIDAY', () => {
                    getFriday();
                });
                socket.on('WEATHER', () => {
                    setNewsLoaded(false);
                    getWeather();
                });
                socket.on('STICKY', () => {
                    getNotes();
                });
                socket.on('DISCORD_UPDATE_USERS', () => {
                    getDiscord();
                });
            }
        break;
        default:
            if(!user){
                fetch(`https://${process.env.REACT_APP_HOST}/user`)
                .then(data => data.json())
                .then(data => {
                    if(data.username) {
                        setUser(data);
                        return setLoggedIn(true);
                    }
                })
                .catch(e => {
                    setLoggedIn(false);
                });

                toast.dark('💌 Welcome!', {
                    position: 'bottom-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        break;
        }
    }, [socket, user]);

    return { props };

}

export default RenderProps;