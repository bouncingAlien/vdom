import createElement from './vdom/createElement';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';

const createVApp = (count) => createElement('div', {
    attr: {
        id: 'app',
        dataCount: count
    },
    children: [
        String(count),
        createElement('img', {
            attr: {
                src: 'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif'
            }
        }),
        createElement('input')
    ]
});

let count = 0;
let vApp = createVApp(count);

const $app = render(vApp);
let $rootElement = mount($app, document.getElementById('root'));

setInterval(() => {
    count++;
    const vNewApp = createVApp(count);
    const patch = diff(vapp, vNewApp);
    patch($rootElement);
    vApp = vNewApp;
}, 1000);

console.log($app);