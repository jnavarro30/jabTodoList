const TodoListApp = (_ => {

    // variables
    const todoAppEl = document.querySelector('.todo__app'),
          headerInputEl = document.querySelector('.header__input'),
          mainListEl = document.querySelector('.main__list');

    const init = _ => {
        listeners();
    };

    const createItem = text => {
        let newItem = document.createElement('li');
        newItem.classList.add('list__item');
        newItem.innerHTML = `
        <p class="item__text" contenteditable="false">${text}</p>
        <i class="fas fa-times item__delete"></i>
        `;
        return newItem;
    };

    const render = _ => {
        let newItem = createItem(headerInputEl.value);
                mainListEl.insertBefore(newItem, mainListEl.children[0]);
                headerInputEl.value = '';
    };

    const listeners = _ => {

        todoAppEl.addEventListener('click', event => {
            const allItemEls = document.querySelectorAll('.item__text');

            if(event.target.matches('.item__text')) {
                let text = event.target.textContent;
                allItemEls.forEach(item => {
                    if (text != item.textContent) item.contentEditable = false;
                });
            } else allItemEls.forEach(item => item.contentEditable = false);
        });
        
        // input Value
        headerInputEl.addEventListener('keypress', event => {
            if(headerInputEl.value.length > 50 && !/\s/.test(headerInputEl.value)) {
                headerInputEl.value = '';
            }
            if(event.keyCode == 13 && headerInputEl.value) render();
        });

        // crossout Item
        mainListEl.addEventListener('click', event => {
            if (event.target.matches('.item__text')) {
                let text = event.target;
                if (text.contentEditable == 'true') text.classList.remove('line__through');
                else text.classList.toggle('line__through');
            }
        });

        // delete Item
        mainListEl.addEventListener('click', event => {
            if(event.target.classList.contains('item__delete')) {
                event.target.parentElement.remove();
            }
        });

        // edit Item 
        mainListEl.addEventListener('dblclick', event => {
            if(event.target.matches('.item__text')) {
                let textItem = event.target;
                textItem.contentEditable = true;
                textItem.classList.remove('line__through');
            }
        });

    };

    return {
        init
    };
})();

TodoListApp.init();