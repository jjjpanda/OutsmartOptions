import React from 'react';

export function tutorialSteps(state, this_) {
  return [
    // Step 1: Title
    {
      position: 'right',
      selector: '[step-name="title"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          What's up 😊? I'm Mr. Outsmart, a sentient AI that'll help guide you on your journey.
          Follow the arrows (⬅➡) and you'll get it in no time.
          <br />
          <a onClick={() => goTo(step)}> Click me ➡ when you're ready to go. </a>
        </div>
      ),
      style: {
        backgroundColor: 'black',
        color: 'white',
      },
    },
    // Step 2: Stock Symbol
    {
      position: 'right',
      selector: '[step-name="stock-symbol-input"]',
      content: ({ goTo, inDOM, step }) => {
        if (!state.exists || state.symbol != '') {
          goTo(step);
        }
        return (
          <div>
            First things first, you should type in a stock and press enter. 😎 (Try something like AAPL or MSFT)
          </div>
        );
      },
    },
    // Step 3: Stock Symbol Incorrect
    {
      position: 'right',
      selector: '[step-name="stock-nonexistent"]',
      content: ({ goTo, inDOM, step }) => {
        if (inDOM) {
          return (
            <div>
              Well, well, well 😒. Looks like we got a rebel here.
              <a onClick={() => {
                this_.setState(() => ({ exists: true, symbol: '' }));
                goTo(1);
              }}
              >
                {' '}
                Go back ⬅
              </a>
              and type in a stock that actually exists and has options.
            </div>
          );
        }

        goTo(step);
      },
    },
    // Step 4: Price
    {
      position: 'right',
      selector: '[step-name="stock-price"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          Once you type in the stock, you'll see the current price right here. Pretty cool right?
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to move on</a>
          <br />
          <a onClick={() => {
            this_.setState(() => ({ symbol: '' }));
            goTo(1);
          }}
          >
            Click here ⬅ to input a stock
          </a>
        </div>
      ),
    },
    // Step 5: Percent Change
    {
      position: 'right',
      selector: '[step-name="stock-percent-change"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          And here is the percent change for the day. We don't have premarket moves, so only during and after market hours will you see any changes.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to move on</a>
          <br />
          <a onClick={() => {
            this_.setState(() => ({ symbol: '' }));
            goTo(1);
          }}
          >
            Click here ⬅ to input a stock
          </a>
        </div>
      ),
    },
    // Step 6: Edit Leg Button
    {
      position: 'right',
      selector: '[step-name="edit-leg"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.addLegModalVisible) {
          goTo(step);
        }
        return (
          <div>
            So here is where we get into the meat 🍖 of this thing.
            This button will open up the options chain.
            Note that if you -sigh- didn't type in an stock that
            has an options chain 😓 the button will be disabled.
            However, if a stock doesn't immediately load the button, don't get scared 😯.
            It may take a while to load. So go ahead, click the button.
            <br />
            <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
          </div>
        );
      },
    },
    // Step 7: Show modal with expiries
    {
      position: 'right',
      selector: '[step-name="edit-leg-modal"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.activeOptionExpiry != undefined && state.activeOptionExpiry.length > 0) {
          goTo(step);
        }
        if (state.addLegModalVisible) {
          return (
            <div>
              Here it is 🎉.
              Each date displayed is an expiry date for the contracts available for the stock.
              So what are you waiting for? Pick an expiry.
              <br />
              <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
              <br />
              <a onClick={() => {
                this.closeOptionsChainModal();
                goTo(step - 2);
              }}
              >
                Click here ⬅ to go back.
              </a>
            </div>
          );
        }

        goTo(step - 2);
      },
    },
    // Step 8: Show selected expiry table
    {
      position: 'right',
      selector: `[step-name="${state.activeOptionExpiry || ' '}"]`,
      content: ({ goTo, inDOM, step }) => {
        if (inDOM && state.addLegModalVisible && state.activeOptionExpiry != undefined && state.activeOptionExpiry != '') {
          return (
            <div>
              Yikes 😬. A lot, right?
              You'll see call options on the left, put options on the right.
              If you found the green row, that is the at-the-money strike.
              Use the checkboxes ☑ to add a contract to your strategy. Or 3 contracts. Or 5. Up to you 🤷‍♀️.
              <br />
              If you don't know what these words mean 🤔, you should probably go to our help page. We explain stuff in detail there 🤓.
              <br />
              <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
              <br />
              <a onClick={() => {
                this.closeOptionsChainModal();
                goTo(step - 3);
              }}
              >
                Click here ⬅ to go back.
              </a>
            </div>
          );
        }

        goTo(step - 2);
      },
    },
    // Step 9: Ok button on modal
    {
      position: 'right',
      selector: '[step-name="ok-button-modal"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.addLegModalVisible) {
          if (state.optionsSelected.length > 0) {
            return (
              <div>
                Once you select all the strategies your heart desires, click this ok button 🆗.
              </div>
            );
          }

          goTo(step - 2);
        } else {
          goTo(step);
        }
      },
    },
    // Step 10: Example option leg
    {
      position: 'right',
      selector: '[step-name="example-contract"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          Here's the list of the options you just selected.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(5)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 11: Option name
    {
      position: 'right',
      selector: '[step-name="contract-name"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          This is the name of the contract.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 12: Option long or short
    {
      position: 'right',
      selector: '[step-name="buy-or-write"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          Here you can specify whether this specific option is being written or bought.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 13: Option quantity.
    {
      position: 'right',
      selector: '[step-name="option-quantity"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          And here's some more input if you wanna increase the quantity of the specific contract 💸.
          Maybe you wanna buy 3, 4, 50 contracts. No judgement here 🤐.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 14: Option bought at price.
    {
      position: 'right',
      selector: '[step-name="limit-price"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          And another input 😪. This is for specifying the price you paid or got paid for this specific leg.
          For example, you may have already bought a contract and it didn't go so well 📉.
          In that case you can type in that you paid a bit more than the price now.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 15: Calculate button
    {
      position: 'right',
      selector: '[step-name="calculate-button"]',
      content: ({ goTo, inDOM, step }) => {
        if (state.mergedOptions != undefined) {
          goTo(step);
        }
        return (
          <div>
            Finally, we get to the big cheese 🧀. Hit this calculate button for the results we've all been waiting for.
            <br />
            <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
          </div>
        );
      },
    },
    // Step 16: Cost of strat card
    {
      position: 'right',
      selector: '[step-name="cost-card"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          Here is the cost of the strategy.
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => {
            this_.setState(() => ({ mergedOptions: undefined }));
            goTo(step - 2);
          }}
          >
            Click here ⬅ to go back.
          </a>
        </div>
      ),
    },
    // Step 17: Profit graph
    {
      position: 'right',
      selector: '[step-name="profit-graph"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          graf
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
    // Step 18: Profit table
    {
      position: 'right',
      selector: '[step-name="profit-table"]',
      content: ({ goTo, inDOM, step }) => (
        <div>
          table
          <br />
          <a onClick={() => goTo(step)}>Click here ➡ to continue.</a>
          <br />
          <a onClick={() => goTo(step - 2)}>Click here ⬅ to go back.</a>
        </div>
      ),
    },
  ];
}
