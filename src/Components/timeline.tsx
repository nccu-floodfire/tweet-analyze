import React from 'react';
import { useState } from 'react';
import './Timeline.css';

interface HighlightPeriod {
  fileName: string;
  startDate: string; // format: YYYYMMDD
  endDate: string; // format: YYYYMMDD
}

interface TimelineProps {
  startDate: string; // format: YYYYMMDD
  endDate: string; // format: YYYYMMDD
  highlightPeriods: HighlightPeriod[];
  highlightPeriods2: HighlightPeriod[];
  setSelectedFile: (fileName: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ startDate, endDate, highlightPeriods,highlightPeriods2, setSelectedFile}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const start = new Date(`${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`); //20221211 to 2022-12-11
  const end = new Date(`${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`);
  
  const dates = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    dates.push(new Date(dt));
  }

  let lastMonth = start.getMonth() - 1; // Set to previous month

  const highlightDates = highlightPeriods.map((period, index) => {
    const start = new Date(`${period.startDate.slice(0, 4)}-${period.startDate.slice(4, 6)}-${period.startDate.slice(6, 8)}`);
    const end = new Date(`${period.endDate.slice(0, 4)}-${period.endDate.slice(4, 6)}-${period.endDate.slice(6, 8)}`);
    
    const dates = [];
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        dates.push({ date: new Date(dt), period: period });
      }

    return dates;
  }).flat();
  const highlightDates2 = highlightPeriods2.map((period, index) => {
    const start = new Date(`${period.startDate.slice(0, 4)}-${period.startDate.slice(4, 6)}-${period.startDate.slice(6, 8)}`);
    const end = new Date(`${period.endDate.slice(0, 4)}-${period.endDate.slice(4, 6)}-${period.endDate.slice(6, 8)}`);
    
    const dates = [];
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        dates.push({ date: new Date(dt), period: period });
      }

    return dates;
  }).flat();

  const groupHighlightDates = (highlightDates) => {
    const groups = [];
    let currentGroup = [];
  
    highlightDates.forEach((highlightDate, index) => {
      currentGroup.push(highlightDate);
  
      if (index === highlightDates.length - 1 || highlightDate.period !== highlightDates[index + 1].period) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    });
  
    return groups;
  };
  
  const highlightGroups = groupHighlightDates(highlightDates);
  // console.log('highlightGroups:', highlightGroups);
  const highlightGroups2 = groupHighlightDates(highlightDates2);

  const handleClick = (period: HighlightPeriod) => {
    // console.log('filname2', period.fileName);
    setSelectedFile(period.fileName);
    setSelectedFileName(period.fileName);
  };

  return (
  <div className="timeline">
    {dates.map((date, index) => {
      const newMonth = date.getMonth() !== lastMonth;
      lastMonth = date.getMonth();
      const highlightGroup = highlightGroups.find(group => group.find(highlightDate => highlightDate.date.getTime() === date.getTime()));
      const highlightGroup2 = highlightGroups2.find(group => group.find(highlightDate => highlightDate.date.getTime() === date.getTime()));
      // console.log('highlightGroup:', highlightGroup);

      return (
        <div key={index} className="timeline-item">
            {newMonth && <div className="timeline-month">{date.toLocaleString('default', { month: 'long' })}</div>}
            {highlightGroup && <div className="timeline-highlight-group">
              <div className="timeline-bar" ></div>
              {date.getTime() === highlightGroup[Math.ceil(highlightGroup.length / 2)].date.getTime() && 
                  <button className="timeline-highlight" 
                      onClick={() => {
                          handleClick(highlightGroup[0].period);
                      }} 
                      style={{ 
                          backgroundColor: selectedFileName === highlightGroup[0].period.fileName ? '#E9E9E9' : 'transparent', 
                          color: selectedFileName === highlightGroup[0].period.fileName ? 'black' : '#E9E9E9' 
                      }}
                      onMouseOver={(e) => {
                          if (selectedFileName !== highlightGroup[0].period.fileName) {
                              e.currentTarget.style.backgroundColor = 'grey';
                              e.currentTarget.style.color = 'black';
                          }
                      }} 
                      onMouseOut={(e) => {
                          if (selectedFileName !== highlightGroup[0].period.fileName) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#E9E9E9';
                          }
                      }}
                      >{highlightGroup[0].period.startDate} - {highlightGroup[0].period.endDate}
                  </button>
              }
            </div>}
            {!highlightGroup && <div className="timeline-bar"></div>}
            
            <div className="timeline-date">
              {date.getDate()}
            </div>
            {highlightGroup2 && <div className="timeline-highlight-group">
              <div className="timeline-bar" ></div>
              {date.getTime() === highlightGroup2[Math.ceil(highlightGroup2.length / 2)].date.getTime() && 
                  <button className="timeline-highlight2" 
                      onClick={() => {
                          handleClick(highlightGroup2[0].period);
                      }} 
                      style={{ 
                          backgroundColor: selectedFileName === highlightGroup2[0].period.fileName ? '#E9E9E9' : 'transparent', 
                          color: selectedFileName === highlightGroup2[0].period.fileName ? 'black' : '#E9E9E9',
                          width: `${highlightGroup.length*15}px`,
                          height: `50px`,
                          fontSize: `${highlightGroup.length}px`,
                      }}
                      onMouseOver={(e) => {
                          if (selectedFileName !== highlightGroup2[0].period.fileName) {
                              e.currentTarget.style.backgroundColor = 'grey';
                              e.currentTarget.style.color = 'black';
                          }
                      }} 
                      onMouseOut={(e) => {
                          if (selectedFileName !== highlightGroup2[0].period.fileName) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#E9E9E9';
                          }
                      }}
                      >{highlightGroup2[0].period.startDate} - {highlightGroup2[0].period.endDate}
                  </button>
              }
            </div>}
            {!highlightGroup2 && <div className="timeline-bar"></div>}
        </div>
      );
    })}
  </div>
);
}


export default Timeline;