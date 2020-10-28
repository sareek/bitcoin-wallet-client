import React, { Component } from 'react'


import c3 from 'c3';

import './style.scss';

const dataC3doughnut = [
    { total: 10, compliant: 4, tag_name: 'tag1' },
    { total: 12, compliant: 6, tag_name: 'tag2' },
    { total: 15, compliant: 14, tag_name: 'tag3' },
    { total: 14, compliant: 10, tag_name: 'tag4' },
    { total: 9, compliant: 7, tag_name: 'tag5' },
  ];

export class DoughnutChart extends Component {

    componentDidMount() {
        var arrC3 = ['Tags']
        var compliant_value
        var non_compliant
        var id
        // dataC3doughnut.map((item, index) => {
        //   Object.keys(item).map((val, idx) => {
        //     if(val == 'compliant') {
        //         compliant_value = item.compliant
        //         non_compliant = item.total - item.compliant
        //         // arrC3.push(item.value)
        //         this.updateChart3(compliant_value, non_compliant);
        //     }
        //   })
        // })
        this.props.each && Object.keys(this.props.each).map((val, idx) => {
            if(val == 'compliance') {
            id= this.props.each._id
            compliant_value = this.props.each.compliance
            non_compliant = this.props.each.total - this.props.each.compliance
            // arrC3.push(item.value)
            this.updateChart3(compliant_value, non_compliant, id, this.props.each.tag_name);
         }
        })

      }

    componentDidUpdate() {
        var arrC3 = ['Tags']
        var compliant_value
        var non_compliant
        var id
        this.props.each && Object.keys(this.props.each).map((val, idx) => {
            if(val == 'compliance') {
            id= this.props.each._id
            compliant_value = this.props.each.compliance
            non_compliant = this.props.each.total - this.props.each.compliance
            // arrC3.push(item.value)
            this.updateChart3(compliant_value, non_compliant, id, this.props.each.tag_name);
         }
        })
    }

    updateChart3 = (compliant, non_compliant, id, tagname) => {
        var chart3 = c3.generate({
            bindto: `#chart`+id,
            data: {
                columns: [
                    ['compliant', compliant],
                    ['non-compliant', non_compliant],
                ],
                type : 'donut',
             
            },
            donut: {
                title: tagname
            }
        });
    }  

    render() {
      const { each } = this.props;
        return (
            <div className = "doughnut-item">
                {/* <p className="chart-title">Pie Chart - {each.tag_name}</p> */}
                <div style={{width: '100%'}} id={`chart`+each._id}>hi</div>
            </div>
        )
    }
}

export default DoughnutChart
