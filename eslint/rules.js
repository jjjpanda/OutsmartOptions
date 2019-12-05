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
                if(node.name == 'setState' && node.parent.parent.arguments[0].type != "ArrowFunctionExpression" ){
                  //console.log(node.parent.parent.arguments[0])
                  context.report(node, 'setState is not function', function(fixer) {  
                    //return fixer.replaceText(node.parent.parent.arguments[0], "");
                  });
                }
            },
          };
        },
      },
    },
};