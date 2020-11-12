import React from 'react';
import styles from './chart.module.css';
import { ResponsiveLine } from '@nivo/line'

const Chart = (props) => {
    return (
        <div className={styles.chartParent}>
            <ResponsiveLine
                data={props.data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="natural"
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 2,
                    tickPadding: 5,
                    tickRotation: 65,
                    legend: 'Time of Day',
                    legendOffset: 55,
                    legendPosition: 'middle'
                }}

            />
        </div>
    )
}

export default Chart;