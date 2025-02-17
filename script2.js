new Sortable(group1, {
    group: {
        name: 'shared',
        pull: 'clone',
        put: false
    },
    animation: 150,
});


new Sortable(H, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('H');
    }
});

new Sortable(C, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('C');
    }
});

new Sortable(N, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('N');
    }
});

new Sortable(O, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('blue');
        event.item.classList.add('H');
    }
});

new Sortable(F, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('blue');
        event.item.classList.add('H');
    }
});

new Sortable(S, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function (event) {
        event.item.classList.add('blue');
        event.item.classList.add('H');
    }
});

new Sortable(trash, {
    group: {
        name: 'shared',
    },
    animation: 150,
    onAdd: function(event) {
        event.to.removeChild(event.item);
    }
})