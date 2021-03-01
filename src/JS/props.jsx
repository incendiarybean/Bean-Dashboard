import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import image from '../IMG/background.png';

if(process.env.NODE_ENV === 'development') console.log(process.env);

function RenderProps(socket) {
    let timer = 0;

    const [WeatherLoaded, setWeatherLoaded] = useState(false);
    const [NotesLoaded, setNotesLoaded] = useState(false);
    const [ThemeLoaded, setThemeLoaded] = useState(false);
    const [NewsLoaded, setNewsLoaded] = useState(false);
    const [FridayLoaded, setFridayLoaded] = useState(false);
    const [SandstormLoaded, setSandstormLoaded] = useState(false);

    const [Note, setNote] = useState([]);
    const [DailyWeather, setDailyWeather] = useState([]);
    const [TodayWeather, setTodayWeather] = useState('');
    const [Location, setLocation] = useState('');
    const [Articles, setArticles] = useState([]);
    const [Friday, setFriday] = useState([]);
    const [Dates, setDates] = useState([]);
    const [Wins, setWins] = useState([]);
    const [Losses, setLosses] = useState([]);
    const [TodayWins, setTodayWins] = useState(0);
    const [TodayLosses, setTodayLosses] = useState(0);
    const [Search, setSearch] = useState({});
    const [SandstormUserCount, setSandstormUserCount] = useState([1]);
    const [SandstormUser, setSandstormUser] = useState([]);

    const props = {
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
                        document.getElementById('root').classList.remove('theme-light', 'theme-dark');
                        return document.getElementById('root').classList.add('theme-dark');
                    case 'dark':
                        window.localStorage.setItem('theme', 'light');
                        document.getElementById('root').classList.remove('theme-light', 'theme-dark');
                        return document.getElementById('root').classList.add('theme-light');
                    default:
                        window.localStorage.setItem('theme', 'light');
                        document.getElementById('root').classList.remove(`theme-dark`, `theme-light`);
                        return document.getElementById('root').classList.add(`theme-light`);
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
                    'color':note.color
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
            showColor: (note) => {
                let new_notes_arr = [];
                Note.map(data => {
                    if(data._id === note._id){
                        switch(data.showColor){
                            case 'block':
                                data.showColor = 'hidden';
                            break;
                            default:
                                data.showColor = 'block';
                            break;
                        }
                        return new_notes_arr.push(data);
                    } else {
                        return new_notes_arr.push(data);
                    }
                });
                return setNote(new_notes_arr);
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
                    socket.emit('STICKY_UPDATE');
                })
                .catch(e => {
                    console.log(e);
                });
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
                props.custom('💠 Deleting Note!');
                fetch(`https://${process.env.REACT_APP_HOST}/api/v0/sticky/${note._id}`, {
                    method: 'DELETE'
                })
                .then(data => data.json())
                .then(data => {
                    props.custom('💠 Deleted Note!');
                    element.removeEventListener('dragend', element);
                    element.classList.remove('animate__fadeIn', 'animate__fadeOut');
                    element.classList.add('animate__fadeOut');
                })
                .catch(e => {
                    props.error('Couldn\'t delete Note!');
                });
            }
        },
        Friday: {
            Friday: Friday,
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
                }
            },
            removePlayer: (user) => {
                if(SandstormUserCount.length > 1){
                    setSandstormUserCount(SandstormUserCount.filter((item, index) => user !== index));
                }
            },
            generate: () => {
                setSandstormUser(SandstormUser => SandstormUser = []);
                SandstormUserCount.map(user => {
                    return fetch('https://sandstorm-api.local/sandstorm/loadout')
                    .then(data => data.json())
                    .then(data => {
                        data.user = user;
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
        }
    };

    useEffect(() => {
        const weatherIcons = (weatherType, desc) => {
            let todayWeather;
            let weatherDesc = desc;
            switch(weatherType){
                case 'cloud':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><path d='M35.272,41.085A12.292,12.292,0,1,0,23.46,25.426a8.582,8.582,0,1,0-4.854,15.659Z' fill='#b9d8e8'/></svg>;
                    return {todayWeather, weatherDesc};
                case 'sun':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><circle cx='28.398' cy='28.696' fill='#f5ce42' r='16.948'/></svg>;
                    return {todayWeather, weatherDesc};
                case 'rain':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><path d='M35.25,36.834A12.292,12.292,0,1,0,23.438,21.175a8.582,8.582,0,1,0-4.853,15.659Z' fill='#b9d8e8'/><g><path d='M37.208,41.516V34.454' fill='none' stroke='#83b3cb' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><path d='M26.045,47.145V43.123' fill='none' stroke='#9fa6b7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><path d='M21.591,38.3V34.454' fill='none' stroke='#615c9a' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><line fill='none' stroke='#9fa6b7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' x1='30.245' x2='30.245' y1='36.76' y2='34.454'/></g></svg>;
                    return {todayWeather, weatherDesc};
                case 'snow':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><path d='M33.771,35.56A12.292,12.292,0,1,0,21.959,19.9,8.582,8.582,0,1,0,17.106,35.56Z' fill='#b9d8e8'/><circle cx='19.937' cy='34.857' fill='#615c9a' r='2.132'/><circle cx='24.337' cy='43.589' fill='#007a9d' r='2.132'/><circle cx='28.738' cy='34.344' fill='#9fa6b7' r='2.132'/><circle cx='35.752' cy='39.089' fill='#83b3cb' r='2.132'/></svg>;
                    return {todayWeather, weatherDesc};
                case 'thunder':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><g><path d='M35.272,35.883A12.291,12.291,0,1,0,23.46,20.224a8.582,8.582,0,1,0-4.854,15.659Z' fill='#b9d8e8'/><polygon fill='#d86837' points='31.256 28.003 22.134 38.275 27.652 38.34 25.622 46.286 35.452 35.873 29.34 35.873 31.256 28.003'/></g></svg>;
                    return {todayWeather, weatherDesc};
                case 'foggy':
                    todayWeather = <svg height='20.315mm' viewBox='0 0 57.587 57.587' width='20.315mm' xmlns='https:////www.w3.org/2000/svg'><title/><g><path d='M34.734,25.161h-21' fill='none' stroke='#83b3cb' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><path d='M43.734,18.809h-21' fill='none' stroke='#b6d4e3' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><path d='M43.853,32.128H31.893' fill='none' stroke='#9fa6b7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><path d='M34.734,38.778h-21' fill='none' stroke='#615c9a' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4'/><line fill='none' stroke='#9fa6b7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' x1='24.252' x2='17.394' y1='32.124' y2='32.124'/></g></svg>;
                    return {todayWeather, weatherDesc};
                case 'error':
                    todayWeather = <svg height='21' class='transform scale-150' viewBox='0 0 21 21' width='21' xmlns='https:////www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><circle cx='10.5' cy='10.5' r='8' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/><path d='m10.5 11.5v-5' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/><circle cx='10.5' cy='14.5' fill='#2a2e3b' r='1'/></g></svg>;
                    weatherDesc = `${desc.code} : ${desc.message}`;
                    return {todayWeather, weatherDesc};
                default:
                    return({todayWeather:'todayWeather',weatherDesc:'weatherDesc'});
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

        const initTheme = () => {
            if(!window.localStorage.getItem('theme') || !window.localStorage.getItem('colour')){
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    window.localStorage.setItem('theme', 'dark');
                    window.localStorage.setItem('theme', 'blue');
                    document.getElementById('root').classList.add(`theme-dark`, `accent-blue`);
                    document.getElementById('toggle').checked = true;
                } else {
                    window.localStorage.setItem('theme', 'light');
                    window.localStorage.setItem('colour', 'purple');
                    document.getElementById('root').classList.add(`theme-light`, `accent-purple`);
                    document.getElementById('toggle').checked = false;
                }
            } else {
                let theme = window.localStorage;
                document.getElementById('root').classList.add(`theme-${theme.theme}`);
                if(theme.colour === 'null' && theme.theme === 'light') theme.colour = 'purple';
                if(theme.colour === 'null' && theme.theme === 'dark') theme.colour = 'blue';
                document.getElementById('root').classList.add(`accent-${theme.colour}`);
                if (theme.theme === 'dark') document.getElementById('toggle').checked = true;
                if(!document.getElementById(`set-${theme.colour}`)) return;
                document.getElementById(`set-${theme.colour}`).classList.add('border-2');
            }

            setThemeLoaded(true);

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const newColorScheme = e.matches ? 'dark' : 'light';
                document.getElementById('root').classList.remove('theme-light', 'theme-dark');
                window.localStorage.setItem('theme', `${newColorScheme}`);
                document.getElementById('root').classList.add(`theme-${newColorScheme}`);
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
            setTodayWeather(TodayWeather => []);
            setDailyWeather(DailyWeather => []);
            let params = new URLSearchParams({date: 'daily'});
            fetch(`https://${process.env.REACT_APP_HOST}/api/v0/weather?${params}`)
            .then(data => data.json())
            .then(data => {
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

        const getNews = async () => {
            setArticles(Articles => []);
            fetch(`https://${process.env.REACT_APP_HOST}/api/v0/news`)
            .then(data => data.json())
            .then(data => {
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
            setFriday(Friday => []);
            fetch(`https://${process.env.REACT_APP_HOST}/api/v0/friday`)
            .then(data => data.json())
            .then(data => {
                setFriday(data.items);

                if(data.itemsLength === 1){
                    data.items = [data.items];
                }

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

        initTheme();

        socket.on('connect', () => {
            getNews();
            getWeather();
            getNotes();
            getFriday();
        });
        socket.on('disconnect', () => {
            setNewsLoaded(false);
            setWeatherLoaded(false);
            setNotesLoaded(false);
            return toast.error('Server has disconnected, we\'ll reconnect when we can');
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

    }, [socket, Wins]);

    return { props };

}

export default RenderProps;