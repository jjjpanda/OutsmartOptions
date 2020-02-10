import React from 'react';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  ComposedChart,
  Line,
  Legend,
  Label,
  ResponsiveContainer,
  Bar,
} from 'recharts';

import * as timeMath from '../jsLib/timeLibrary.js';

class NoAxisGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer height={300} width="100%">
        <LineChart
          data={this.props.data}
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
        >
          <XAxis dataKey={this.props.xKey} allowDecimals={false} />
          <YAxis />
          <Line name={this.props.dataKey} type="monotone" dot={false} dataKey={this.props.dataKey} stroke="#ffffff" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

class BarLineComboGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer height={300} width="100%">
        <ComposedChart
          data={this.props.data}
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
        >
          <XAxis dataKey={this.props.xKey} allowDecimals={false}/>

          <YAxis yAxisId="right" dataKey={this.props.lineKey} orientation="right" />
          <YAxis yAxisId="left" dataKey={this.props.barKey} orientation="left" />

          <Line yAxisId="right" name={this.props.lineKey} type="monotone" dot={false} dataKey={this.props.lineKey} stroke="#ffffff" />
          <Bar yAxisId="left" name={this.props.barKey} dataKey={this.props.barKey} fill="#99ee9955" />

        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

class ProfitGraph extends React.Component {
  constructor(props) {
    super(props);
    const legs = Array.from(new Set(props.keys.map((a) => a.substring(0, a.indexOf('a'))))).filter((a) => a != '');
    const dates = Array.from(new Set(props.keys.map((a) => a.substring(a.indexOf('a') + 1)))).filter((a) => a != '');
    this.state = {
      data: props.legAddition(props.data, dates, legs),
      keys: props.keys,
      legs,
      dates,
      disabledDates: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.keys !== state.keys) {
      const legs = Array.from(new Set(props.keys.map((a) => a.substring(0, a.indexOf('a'))))).filter((a) => a != '');
      const dates = Array.from(new Set(props.keys.map((a) => a.substring(a.indexOf('a') + 1)))).filter((a) => a != '');
      return {
        data: props.legAddition(props.data, dates, legs),
        keys: props.keys,
        legs,
        dates,
        disabledDates: [],
      };
    }

    return null;
  }

    disableDate = (event) => {
      this.setState((state) => {
        if (state.disabledDates.includes(event.dataKey)) {
          return ({ disabledDates: state.disabledDates.filter((a) => a != event.dataKey) });
        }

        return ({ disabledDates: [...state.disabledDates, event.dataKey] });
      });
    }

    gradientOffset = (data, y) => {
      const dataMax = Math.max(...data.map((i) => i[y]));
      const dataMin = Math.min(...data.map((i) => i[y]));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin > 0) {
        return 1;
      }

      return Math.abs(dataMax) / Math.abs(dataMax - dataMin);
    }

    opacities = (dates) => {
      const opacities = {};
      if (dates.length == 1) {
        opacities[dates[0]] = 1;
        return opacities;
      }
      for (var date of dates) {
        opacities[date] = timeMath.timeBetweenDates(timeMath.stringToDate(date), timeMath.getCurrentDate());
      }
      // console.log(opacities)
      const minOpacity = Math.min(...Object.values(opacities));
      const maxOpacity = Math.max(...Object.values(opacities));
      for (var date of dates) {
        opacities[date] -= minOpacity;
        opacities[date] /= 2 * (maxOpacity - minOpacity);
        opacities[date] += 0.5;
      }
      return opacities;
    }

    colorOfLine = (data, y, opacity) => {
      const arr = data.map((i) => i[y]);
      if (arr.every((e) => e === arr[0])) {
        if (arr[0] > 0) {
          return `#009900${(`00${Math.round(opacity * 255).toString(16)}`).substr(-2)}`;
        }

        return `#ff0000${(`00${Math.round(opacity * 255).toString(16)}`).substr(-2)}`;
      }

      return `url(#splitColor${y})`;
    }

    customTooltip = (e) => {
      const arr = [];
      for (let i = e.payload.length - 1; i >= 0; i--) {
        arr.push((
          <p>
On
            {e.payload[i].name}
            {' '}
you will
            {Math.sign(e.payload[i].value) == 1 ? 'make' : 'lose'}
            {' '}
$
            {e.payload[i].value.toFixed(2)}
          </p>
        ));
      }
      if (e.active && e.payload != null && e.payload[0] != null) {
        return (
          <div style={{ backgroundColor: '#ffffff', lineHeight: 0.5, padding: 5 }} className="custom-tooltip">
            <p>
$
              {e.label.toFixed(2)}
            </p>
            {arr}
          </div>
        );
      }

      return '';
    }

    renderLines = () => {
      /*
      console.log(this.state.dates)
      console.log(this.state.disabledDates)
      console.log(this.state.dates.filter(a => !this.state.disabledDates.includes(a)))
      */
      const opacities = this.opacities(this.state.dates);

      const arr = [];
      for (const date of this.state.dates) {
        arr.push((<defs>
          <linearGradient id={`splitColor${date}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset={this.gradientOffset(this.state.data, date)} stopColor="#009900" stopOpacity={opacities[date]} />
            <stop stopColor="#ff0000" stopOpacity={opacities[date]} />
          </linearGradient>
                  </defs>
        ));
        arr.push((
          <Line name={date} type="monotone" dot={false} hide={this.state.disabledDates.includes(date)} dataKey={date} stroke={this.colorOfLine(this.state.data, date, opacities[date])} />
        ));
      }
      return arr;
    }

    render() {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={this.state.data}
            margin={{
              top: 50, right: 50, left: 50, bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="4 1 2 1" />
            <XAxis dataKey="x" allowDecimals={false}>
              <Label value="Stock Price" position="insideBottom" offset={-5} />
            </XAxis>
            <YAxis>
              <Label value="Profit/Loss" position="insideLeft" offset={-5} angle={-90} />
            </YAxis>
            {this.renderLines()}
            <Legend onClick={this.disableDate} iconType="circle" align="right" verticalAlign="middle" layout="vertical" />
            <Tooltip content={this.customTooltip} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
}

export { NoAxisGraph, BarLineComboGraph, ProfitGraph };
