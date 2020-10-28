const parseSupportType = (supportType) => {
  switch (supportType) {
    case 'imp_issue':
      return 'IMP Issue';
    case 'payment_issue':
      return 'Payment Issue';
    case 'property_issue':
      return 'Property Issue';
    case 'customer_query':
      return 'Customer Query';
    default:
      return 'General Issue';
  }
};

export default parseSupportType;
