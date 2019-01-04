import createElement from './vdom/createElement';
import render from './vdom/render';

const vApp = createElement('div', {
    attr: {
        id: 'app'
    },
    children: [
        createElement('img', {
            attr: {
                src: 'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif'
            }
        })
    ]
});

const $app = render(vApp);

console.log($app);