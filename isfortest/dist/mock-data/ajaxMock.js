var Random = Mock.Random;
Random.id();
Random.ip();
Random.name();
Random.color();


Mock.mock('form/submit', {   
    'success':true,
    'data|1': [{
        'id':'@id',
        'name':'@name',
        'age|1-100': 100,
        'color': 'color'
    }],
    'msg':'you get me'
});

Mock.mock('form/submit2', {   
    'success':true,
    'data|1': [{
        'id':'@id',
        'name':'@name',
        'age|1-100': 100,
        'color': 'color'
    }],
    'msg':'you get me'
});