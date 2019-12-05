module.exports = {
    rules: {
      custom1: {
        docs: {
          description: 'setState should be a function',
          category: 'J Being Picky',
          recommended: true,
        },
        fixable: 'code',
        fix: function(fixer) {
          console.log(fixer)
        },
        schema: [],
        create(context) {
          return {
            Identifier(node) {
                if(node.name == 'setState'){
                    context.report(node, 'This is unexpected!');
                }
            },
          };
        },
      },
    },
};