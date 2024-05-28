export function renderNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
  
}

export function renderBalance(type, balance) {
  switch (type) {
  case 1: // OpenAI
    return <span>${balance.toFixed(2)}</span>;
  case 4: // CloseAI
    return <span>¥{balance.toFixed(2)}</span>;
  case 8: // 自定义
    return <span>${balance.toFixed(2)}</span>;
  case 5: // OpenAI-SB
    return <span>¥{(balance / 10000).toFixed(2)}</span>;
  case 10: // AI Proxy
    return <span>{renderNumber(balance)}</span>;
  case 12: // API2GPT
    return <span>¥{balance.toFixed(2)}</span>;
  case 13: // AIGC2D
    return <span>{renderNumber(balance)}</span>;
  default:
    return <span>不支持</span>;
  }
}

export function calculateQuota(quota, digits = 2) {
  let quotaPerUnit = localStorage.getItem('quota_per_unit');
  quotaPerUnit = parseFloat(quotaPerUnit);

  return (quota / quotaPerUnit).toFixed(digits);
}


export function renderQuota(quota, digits = 2) {
  let displayInCurrency = localStorage.getItem('display_in_currency');
  displayInCurrency = displayInCurrency === 'true';
  if (displayInCurrency) {
    return '$' + calculateQuota(quota, digits);
  }
  return renderNumber(quota);
}


export function timestamp2string(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();
  if (month.length === 1) {
    month = '0' + month;
  }
  if (day.length === 1) {
    day = '0' + day;
  }
  if (hour.length === 1) {
    hour = '0' + hour;
  }
  if (minute.length === 1) {
    minute = '0' + minute;
  }
  if (second.length === 1) {
    second = '0' + second;
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}