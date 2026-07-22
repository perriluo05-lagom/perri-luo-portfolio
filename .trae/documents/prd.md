## 1. Product Overview
打造「Finance × AI × Builder」定位的高端科技感个人品牌官网，以叙事化滚动浏览为核心载体，传递Perri Luo的「整合金融研究、AI工程、产品思维与学术能力的构建者」个人形象。对标Apple、Linear、Vercel官网的视觉与交互完成度。

## 2. Core Features

### 2.1 User Roles
| Role | Registration Method | Core Permissions |
|------|---------------------|------------------|
| Visitor | None | Browse all content, interact with components, use AI chat |

### 2.2 Feature Module
1. **Landing Section**: 首页首屏，粒子背景动效，极简居中文案
2. **Who I Am**: 成长路径时间轴，点击展开节点内容卡片
3. **Interactive Skill Map**: 动态知识网络拓扑图，节点交互展开
4. **Featured Projects**: 苹果官网式滚动叙事项目展示，含交互式组件
5. **AI Playground**: AI工具作品卡片展示，Chat with My Portfolio对话入口
6. **Thinking**: 思考专栏，轻量化卡片布局
7. **Contact**: 终端风格联系区块，命令行交互

### 2.3 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Single Page | Landing Section | 深色背景+数据粒子动效，鼠标交互跟随，三行主文案居中排版 |
| Single Page | Who I Am | 纵向时间轴，5个成长节点，点击展开/收起内容卡片，平滑过渡动画 |
| Single Page | Skill Map | 动态知识网络拓扑图，中心节点关联6个分支节点，悬浮高亮+展开动画 |
| Single Page | Featured Projects | 三个项目独立滚动叙事单元：Daily A-share Intelligence、Prospect Theory、Industry Research |
| Single Page | AI Playground | 4个AI工具卡片，玻璃拟态风格，Chat with My Portfolio对话入口 |
| Single Page | Thinking | 4个思考主题，轻量化卡片，对标Apple Notes风格 |
| Single Page | Contact | 终端命令行界面，help命令触发命令列表，一键复制联系方式 |

## 3. Core Process
用户访问首页 → 浏览首屏粒子背景 → 向下滚动浏览成长路径 → 探索技能网络 → 体验交互式项目 → 尝试AI工具 → 阅读思考专栏 → 通过终端联系

## 4. User Interface Design

### 4.1 Design Style
- **配色**: 深色近黑(#0a0a0a)为主底色，低饱和强调色(#00d4ff, #7c3aed)点缀，文字高对比度
- **按钮风格**: 极简扁平，hover微变，无圆角或极小圆角
- **字体**: Geist/SF Pro风格无衬线字体，字重克制
- **布局**: 大面积留白，卡片式布局，滚动叙事节奏
- **视觉元素**: 玻璃拟态(Glassmorphism)卡片，轻量化3D元素，数据粒子动效

### 4.2 Page Design Overview
| Page Name | Module Name | UI Elements |
|-----------|-------------|-------------|
| Single Page | Landing | 深色背景+Three.js粒子动效，三行大字号文案居中，署名信息 |
| Single Page | Who I Am | 纵向时间轴线，圆形节点，展开卡片(玻璃拟态)，项目/代码/论文摘要 |
| Single Page | Skill Map | Three.js动态网络拓扑，中心节点+6分支节点，悬浮高亮，二级内容面板 |
| Single Page | Featured Projects | 全屏标题→演示画面→Dashboard→GitHub入口→Read More |
| Single Page | AI Playground | 玻璃拟态卡片，4个工具入口，Chat对话框组件 |
| Single Page | Thinking | 极简卡片，短篇幅内容，极简插图，干净排版 |
| Single Page | Contact | 终端命令行界面，打字机效果，命令交互，复制反馈 |

### 4.3 Responsiveness
- Desktop-first设计，全响应式适配
- 移动端：时间轴转为横向滚动，技能网络简化，项目卡片堆叠

### 4.4 3D Scene Guidance
- **Landing粒子背景**: 深色环境，缓慢流动数据粒子，鼠标交互跟随
- **Skill Map拓扑图**: 中心点放射状布局，节点连线动画，悬浮高亮效果
- **性能预算**: 粒子数量控制在500以内，避免性能问题

## 5. Interaction Specifications

### 5.1 Global Interactions
- 全局平滑滚动，区块切换元素渐入过渡
- 可交互元素hover反馈：卡片上浮、阴影变化、颜色微变
- 弹窗/展开带缓动动画(cubic-bezier)

### 5.2 Module Specific
| Module | Interactions |
|--------|--------------|
| Landing | 粒子跟随鼠标，滚动提示动画 |
| Who I Am | 点击节点展开/收起卡片，平滑过渡 |
| Skill Map | 悬浮节点高亮，点击展开二级内容 |
| Featured Projects | 滚动触发内容渐入，Prospect Theory拖拽参数实时计算曲线 |
| AI Playground | 卡片hover上浮，Chat对话框消息发送 |
| Thinking | 卡片hover放大，点击进入详情 |
| Contact | 命令输入，点击复制，成功提示 |
