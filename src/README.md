# The Outsmart Options Frontend

**THIS MAY BE INACCURATE. FRONTEND IS UNDER DEVELOPMENT AND MAY CHANGE. DOCUMENT DRIVEN DEVELOPMENT, YOU KNOW?**

So the frontend is React. [Webpack](../webpack.config.js) & [Babel](../babel.config.json) start from [App.jsx](App.jsx) and [app.html](app.html) and write into the [dist folder](../dist).

## Folder Structure

- [components](components) 
    - [Graphs.jsx](#graphsjsx)
    - [HelpTooltip.jsx](#helptooltipjsx)
    - [OptionsLeg.jsx](#optionslegjsx)
    - [SideMenu.jsx](#sidemenujsx)
    - [SpinningLogo.jsx](#spinninglogojsx)
    - [StockCalendar.jsx](#stockcalendarjsx)
    - [StockSymbol.jsx](#stocksymboljsx)
    - [StrategyInfo.jsx](#strategyinfojsx)
    - [UserForms.jsx](#userformsjsx)
    - [UserVerifier.jsx](#userverifierjsx)
- [css](css)
    - [fonts](css/fonts)
- [img](img)
    - [helpPageImages](img/helpPageImages)
- [pages](pages)
    - [AboutPage.jsx](#aboutpagejsx)
    - [CheckoutPage.jsx](#checkoutjsx)
    - [HelpPage.jsx](#helppagejsx)
    - [HomePage.jsx](#homepagejsx)
    - [LoginPage.jsx](#loginpagejsx)
    - [OptionsCalculator.jsx](#optionscalculatorjsx)
    - [Watchlist.jsx](#watchlistjsx)
- [App.jsx](#appjsx)
- [app.html](app.html)

## App.jsx

The beginning. 

**App** acts as the parent of the **SideMenu** and router for the main pages. For example, http://outsmart.options.works/calc will send **App**, App which takes the [*/calc*](../server/README.md#public-static-files-and-directories) query to route to **OptionsCalculator**.

## SideMenu.jsx

**SideMenu** acts as a navigation bar. The buttons link to */calc*, */watch*, */login*, etc. 

## HomePage.jsx

## OptionsCalculator.jsx

## Watchlist.jsx

## AboutPage.jsx

## HelpPage.jsx

## CheckoutPage.jsx