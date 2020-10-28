const parseSeverityType = (severityType) => {
  switch (severityType) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'General Guidance';
  }
};

export default parseSeverityType;
