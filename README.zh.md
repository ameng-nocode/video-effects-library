<p align="center">
  <img src="docs/screenshots/zh-dark.png" alt="Video Effects Library 首页，中文加深色模式" width="100%">
</p>

<h1 align="center">Video Effects Library</h1>

<p align="center">
  106 个有名字的视频效果，每个都有一段会动的短片。<br>
  勾选你要的，复制一个 prompt，丢进 Claude Code 或任何 AI 视频工具。
</p>

<p align="center">
  <b><a href="https://video-effects-library.vercel.app">打开网站</a></b> ·
  <a href="README.md">English</a> ·
  <a href="#怎样用">怎样用</a> ·
  <a href="#里面有什么">里面有什么</a> ·
  <a href="#加新的类别">加新的类别</a> ·
  <a href="#重新做-clip">重新做 clip</a>
</p>

---

## 为什么做这个

现在很多人用 AI 做视频，可是讲不出自己要的效果叫什么。跟 AI 说「做得 cinematic 一点」，出来的东西很随机。跟它说「Dolly zoom：镜头从 4.6 米退到 15 米，同时镜头 zoom in，3.4 秒」，就拍得出来。

这个 library 帮每个效果配上真正的名字，让你看到它怎么动，再给你一段可以直接用的 prompt。

## 里面有什么

| 类别 | 数量 | 例子 |
|---|---|---|
| **运镜** | 16 | Push in、Orbit、Dolly zoom、Whip pan、FPV fly-through，全部在同一个 3D 场景拍，方便比较 |
| **动态图形** | 16 | Pop in、Overshoot、Stagger、Mask reveal、Count-up、Motion trail |
| **设计风格** | 46 | Bauhaus、Swiss style、Risograph、Glassmorphism、Liquid metal、FUI、Frutiger Aero、Y2K，每个风格都用它自己的样子画、自己的方式动 |
| **文字动画** | 28 | Typewriter、Scramble、Highlighter、Karaoke 字幕、3D 立体字 |

每个效果都有：

- 一段 **9:16 短片**，用 code 做的，没有素材库，也没有 AI 生成的图
- **真正的名字**，来源 link 写在资料文件里
- **怎样跟 AI 讲**：一句简单的话
- **动作规格**：怎么动、多远、多久、快慢
- **Prompt**：可以直接贴进 Claude Code、Runway、Kling、Veo 这些工具

## 怎样用

**在线用：** 打开 [video-effects-library.vercel.app](https://video-effects-library.vercel.app)。

**在自己电脑用：** 不用安装，不用开 server。下载这个 repo，打开一个文件就好：

```bash
git clone https://github.com/ameng-nocode/video-effects-library.git
```

然后用 browser 打开 `site/index.html`。

1. **看**：每个 clip 都在播。用上面的分类和下面的 filter 找你要的。
2. **勾**：在效果下面打勾，右上角的「我的 Prompt」会显示数量。
3. **排顺序、写备注**：打开「我的 Prompt」，上下调顺序，每个可以写备注，例如「开头用」。
4. **复制**：按「复制 Prompt」，贴进你的 AI 工具。

右上角可以切换 **中文 / English** 和 **浅色 / 深色**。你勾的效果、备注、语言和颜色都会存在你自己的 browser 里。

Prompt 本身保持英文，因为 AI 工具认的名字是英文。

## 加新的类别

加一个新类别只要三样东西，不用改网站的 code：

1. **资料文件** `data/<类别>.json`：每个效果要有 `id`、`no`、`name`、`line`、`prompt`、`also_called`（`[{ "name", "where" }]`）和 `sources`（`[{ "name", "url" }]`）。
2. **短片**放在 `previews/clips/<类别>/<id>.mp4`：9:16，720 px 宽，大约 5 秒，下面有名字和一句说明，跟其他的一样。
3. 在 `site/categories.json` **加一条**：标题、一句说明、资料路径、短片文件夹、filter 分组。中文标题和 filter 名字加在 `site/zh.json`。

然后跑 `node site/build.mjs`。「转场」已经在名单里，资料文件做好之前会显示「即将推出」。

## 重新做 clip

只有要改 clip 或做新的才需要。要先有 Node 20 以上、[ffmpeg](https://ffmpeg.org/)，还有 [HyperFrames](https://github.com/heygen-com/hyperframes)（用 `npx` 跑，不用自己装）。

| 类别 | 做场景 | 出 clip |
|---|---|---|
| 运镜 | `node scripts/build-set3d.mjs` | `bash scripts/build-camera-render.sh <id>` |
| 动态图形 | `node scripts/build-mg.mjs` | `bash scripts/build-mg-render.sh <id>` |
| 设计风格 | `node scripts/build-ds.mjs` | `bash scripts/build-ds-render.sh <id>` |
| 文字动画 | `node scripts/build-text.mjs` | `bash scripts/build-text-render.sh <id>` |

## 名字从哪里来

没有一个名字是我们自己编的。每个都是 AI 视频工具、动画 library 或设计资料里真的在用的叫法，来源 link 都写在 `data/<类别>.json` 里。

运镜的名字来自 Runway、Google Veo、Kling、MiniMax Hailuo、Higgsfield、Luma、OpenAI Sora 的官方说明。动态图形和文字动画来自 GSAP、Motion、Animate.css、After Effects 和 HyperFrames。设计风格来自设计史的资料，还有大家在 AI 图片和视频工具里常用的风格名字。

## 授权

[MIT](LICENSE)。Code 和短片都可以自由使用、修改、分享。用到的字体和 library 写在 [English README](README.md#credits) 的 Credits。
