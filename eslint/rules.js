module.exports = {
    rules: {
      custom1: {
        docs: {
          description: 'setState should be a function',
          category: 'J Being Picky',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
        create(context) {
          return {
            Identifier(node) {
              console.log(nsode.parent.parent.arguments)
                if(node.name == 'setState' && node.parent.parent.arguments.type != "ArrowFunctionExpression" ){
                    context.report(node, 'setState is not function', function(fixer) {
                      return fixer.insertTextAfter(node, "");
                  });
                }
            },
          };
        },
      },
    },
};