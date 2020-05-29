

const TodoListApp = (_ => {

    //Variables

    const headerInputEl = document.querySelector('.header__input'),
          mainListEl = document.querySelector('.main__list'),
          itemTextEls = document.querySelectorAll('.item__text'),
          itemDeleteEls = document.querySelectorAll('.item__delete');

    const init = _ => {
        listeners();
    }

    const createItem = text => {
        let newItem = document.createElement('li');
        newItem.classList.add('list__item');
        newItem.innerHTML = `
        <p class="item__text">${text}</p>
        <i class="fas fa-times item__delete"></i>
        `;
        return newItem;
    }

    const render = _ => {
        let newItem = createItem(headerInputEl.value);
                mainListEl.insertBefore(newItem, mainListEl.children[0]);
                headerInputEl.value = '';
    }

    const listeners = _ => {
        //Input Value

        headerInputEl.addEventListener('keypress', event => {
            if(headerInputEl.value.length > 50 && !/\s/.test(headerInputEl.value)) {
                headerInputEl.value = '';
            }
            if(event.keyCode == 13 && headerInputEl.value) render();
        })

        //Crossout Item

        mainListEl.addEventListener('click', event => {
            if(event.target.classList.contains('item__text')) {
                event.target.classList.toggle('line__through');
            }
        })

        //Delete Item

        mainListEl.addEventListener('click', event => {
            if(event.target.classList.contains('item__delete')) {
                event.target.parentElement.remove();
            }
        })
    }

    return {
        init
    }
})();

TodoListApp.init();