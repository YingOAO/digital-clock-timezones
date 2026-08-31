// 定义时区和城市
const timezones = [
    { name: '纽约', timezone: 'America/New_York', emoji: '🗽' },
    { name: '伦敦', timezone: 'Europe/London', emoji: '🇬🇧' },
    { name: '巴黎', timezone: 'Europe/Paris', emoji: '🗼' },
    { name: '迪拜', timezone: 'Asia/Dubai', emoji: '🌅' },
    { name: '东京', timezone: 'Asia/Tokyo', emoji: '🗾' },
    { name: '上海', timezone: 'Asia/Shanghai', emoji: '🇨🇳' },
    { name: '香港', timezone: 'Asia/Hong_Kong', emoji: '🏙️' },
    { name: '新加坡', timezone: 'Asia/Singapore', emoji: '🌴' },
    { name: '悉尼', timezone: 'Australia/Sydney', emoji: '🦘' },
    { name: '洛杉矶', timezone: 'America/Los_Angeles', emoji: '🎬' },
    { name: '多伦多', timezone: 'America/Toronto', emoji: '🍁' },
    { name: '莫斯科', timezone: 'Europe/Moscow', emoji: '🇷🇺' },
];

// 初始化时钟
function initClocks() {
    const clocksGrid = document.getElementById('clocksGrid');
    clocksGrid.innerHTML = '';

    timezones.forEach(tz => {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.innerHTML = `
            <div class="timezone-name">${tz.emoji} ${tz.name}</div>
            <div class="city-name">${tz.timezone}</div>
            <div class="digital-time" data-timezone="${tz.timezone}">--:--:--</div>
            <div class="time-details">
                <div class="date" data-date="${tz.timezone}"></div>
                <div class="period" data-period="${tz.timezone}"></div>
            </div>
        `;
        clocksGrid.appendChild(clockCard);
    });

    // 开始更新时钟
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
}

// 更新所有时钟
function updateAllClocks() {
    timezones.forEach(tz => {
        updateClock(tz.timezone);
    });
}

// 更新单个时钟
function updateClock(timezone) {
    const now = new Date();
    
    // 使用 Intl API 获取该时区的时间
    const formatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
    });

    const timeString = formatter.format(now);
    const dateString = dateFormatter.format(now);

    // 获取小时来判断早上还是晚上
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour').value);

    let period = '';
    if (hour >= 5 && hour < 12) {
        period = '🌅 早上';
    } else if (hour >= 12 && hour < 17) {
        period = '☀️ 下午';
    } else if (hour >= 17 && hour < 21) {
        period = '🌆 傍晚';
    } else {
        period = '🌙 晚上';
    }

    // 更新 DOM
    const timeElement = document.querySelector(`[data-timezone="${timezone}"]`);
    const dateElement = document.querySelector(`[data-date="${timezone}"]`);
    const periodElement = document.querySelector(`[data-period="${timezone}"]`);

    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
    if (periodElement) periodElement.textContent = period;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initClocks);