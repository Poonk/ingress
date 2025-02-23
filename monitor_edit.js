const itemsSet = new Set(); // 用于存储唯一的项目
let countDescriptionEdit = 0;
let countPhotoSubmission = 0;
let countLocationEdit = 0; // 新增：修改位置的项目计数
const descriptionProjectCounts = {}; // 存储修改描述的项目名称及其计数
const photoProjectCounts = {}; // 存储添加图片的项目名称及其计数
const locationProjectCounts = {}; // 存储修改位置的项目名称及其计数

// 更新统计信息的函数
function updateStats() {
  console.clear(); // 清除控制台
  console.log(`修改描述的项目数量: ${countDescriptionEdit}`);
  console.log(`添加图片的项目数量: ${countPhotoSubmission}`);
  console.log(`修改位置的项目数量: ${countLocationEdit}`); // 输出修改位置的项目数量
  
  // 显示修改描述的项目名称及其重复数量
  console.log("修改描述的项目: ");
  for (const [name, count] of Object.entries(descriptionProjectCounts)) {
    console.log(`- ${name} (${count}次)`);
  }
  
  // 显示添加图片的项目名称及其重复数量
  console.log("添加图片的项目: ");
  for (const [name, count] of Object.entries(photoProjectCounts)) {
    console.log(`- ${name} (${count}次)`);
  }
  
  // 显示修改位置的项目名称及其重复数量
  console.log("修改位置的项目: ");
  for (const [name, count] of Object.entries(locationProjectCounts)) {
    console.log(`- ${name} (${count}次)`);
  }
  
  // 计算总数和与150的差距
  const totalCount = countDescriptionEdit + countPhotoSubmission + countLocationEdit; // 更新总数计算
  const difference = 150 - totalCount;
  console.log(`总项目数量: ${totalCount}`);
  console.log(`与150的差距: ${difference}`);
}

// 处理项目的函数
function processItems() {
  const items = document.querySelectorAll('app-submissions-list-item');
  items.forEach(item => {
    // 获取项目的标题、日期和内容
    const title = item.querySelector('.submissions-item__poiTitle span').textContent.trim();
    const dateText = item.querySelector('.text-xs.whitespace-nowrap').textContent.trim();
    const content = item.querySelector('.submissions-item__content').textContent.trim(); // 假设这是项目内容的选择器
    
    // 使用标题、日期和内容组合成唯一标识
    const uniqueKey = `${title}-${dateText}-${content}`;
    
    // 检查是否已经处理过该项目
    if (!itemsSet.has(uniqueKey)) {
      itemsSet.add(uniqueKey); // 添加到 Set 中以避免重复处理
      
      // 检查日期是否大于 2024-10-30
      if (new Date(dateText) > new Date('2024-10-30')) {
        // 检查项目类型
        const descriptionIcon = item.querySelector('img[src="/img/description_icon.svg"]');
        const photoIcon = item.querySelector('img[src="/img/photo_icon.svg"]');
        const locationIcon = item.querySelector('img[src="/img/location_icon.svg"]'); // 新增：检查修改位置的图标
        
        if (descriptionIcon) {
          countDescriptionEdit++;
          console.log(`修改描述的项目: ${title}, 日期: ${dateText}`);
          descriptionProjectCounts[title] = (descriptionProjectCounts[title] || 0) + 1; // 计数
        } else if (photoIcon) {
          countPhotoSubmission++;
          console.log(`添加图片的项目: ${title}, 日期: ${dateText}`);
          photoProjectCounts[title] = (photoProjectCounts[title] || 0) + 1; // 计数
        } else if (locationIcon) { // 新增：处理修改位置的项目
          countLocationEdit++;
          console.log(`修改位置的项目: ${title}, 日期: ${dateText}`);
          locationProjectCounts[title] = (locationProjectCounts[title] || 0) + 1; // 计数
        }
        
        // 更新统计信息
        updateStats();
      }
    }
  });
}

// 使用 MutationObserver 监视 DOM 变化
const observer = new MutationObserver(() => {
  processItems(); // 每当 DOM 变化时调用处理函数
});

// 观察目标节点的变化
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 提示用户手动翻页
console.log("请手动翻页以加载更多项目。");
