/*const stageInfo = [
    [[['red', 'H', 1]], [[0, 0, 0]]],
    [[['yellow', 'O', 2]], [[0, 0, 0]]],
    [[['green', 'C', 1], ['orange', 'F', 3]], [[0, 0, 0], [0, 0, 0]]],
    [[['red', 'S', 1], ['orange', 'F', 1], ['yellow', 'O', 1], ['green', 'N', 1], ['blue', 'C', 1], ['purple', 'H', 1]], [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[['green', 'F', 2]], [[0, 0, -1]]],
    [[['red', 'C', 3], ['blue', 'N', 5]], [[0, -1, 0], [-1, 0, 0]]],
    [[['purple', 'O', 2], ['orange', 'S', 1], ['red', 'H', 4]], [[-1, 0, 0], [-1, 0, 0], [-1, 0, 0]]],
    [[['red', 'H', 6], ['yellow', 'C', 1]], [[0, 0, 1], [0, -1, 1]]],
    [[['blue', 'F', 4], ['green', 'O', 2]], [[0, 1, -1], [0, 1, 0]]],
    [[['yellow', 'S', 2], ['red', 'O', 1], ['blue', 'N', 2]], [[0, 1, 0], [0, 1, 2], [0, -1, 2]]],
    [[['green', 'C', 1], ['red', 'N', 1], ['yellow', 'O', 1]], [[0, 0, 1], [-1, 0, 1], [-1, 0, 1]]],
    [[['purple', 'O', 1], ['blue', 'S', 1], ['orange', 'H', 7], ['yellow', 'N', 1]], [[0, 0, 1], [0, -1, 1], [-1, 0, 2], [0, 0, 2]]],
    [[['red', 'F', 4], ['yellow', 'N', 2], ['green', 'S', 6]], [[0, 1, -1], [0, 1, 0], [0, 1, -1]]],
];*/

const stageInfo = [
    new Mixture([['p', 1], ['b', 1], ['o', 7], ['y', 1]], '-HN-SO', 'oxooooo', [[0, -1, 0, 0], [1, 1, 2, 2]]),
    new Mixture([['r', 1]], 'H-----', 'oooooo', [[0], [0]]),
    new Mixture([['y', 2]], '--O---', 'oooooo', [[0], [0]]),
    new Mixture([['g', 1], ['o', 3]], '-F-C--', 'oooooo', [[0], [0]]),
    new Mixture([['r', 1], ['o', 1], ['y', 1], ['g', 1], ['b', 1], ['p', 1]], 'SFONCH', 'oooooo', [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]),
    new Mixture([['g', 2]], '---F--', 'oooooo', [[0], [-1]]),
    new Mixture([['r', 3], ['b', 5]], 'C---N-', 'ooooxo', [[-1, 0], [0, 0]]),
];