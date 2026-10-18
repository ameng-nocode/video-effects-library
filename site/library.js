// Made by site/build.mjs from site/categories.json. Do not edit by hand.
window.LIBRARY = {
 "built": "2026-10-18",
 "sources": [
  {
   "id": "runway",
   "name": "Runway",
   "short": "Runway",
   "doc": "Camera terms guide",
   "url": "https://help.runwayml.com/hc/en-us/articles/47313504791059-Camera-Terms-Prompts-Examples"
  },
  {
   "id": "veo",
   "name": "Google Veo",
   "short": "Veo",
   "doc": "Video prompt guide",
   "url": "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide"
  },
  {
   "id": "kling",
   "name": "Kling",
   "short": "Kling",
   "doc": "Camera control guide",
   "url": "https://kling.ai/blog/kling-ai-camera-control-video-guide"
  },
  {
   "id": "hailuo",
   "name": "MiniMax Hailuo",
   "short": "Hailuo",
   "doc": "Video API docs",
   "url": "https://platform.minimax.io/docs/api-reference/video-generation-t2v"
  },
  {
   "id": "higgsfield",
   "name": "Higgsfield",
   "short": "Higgsfield",
   "doc": "Camera controls",
   "url": "https://higgsfield.ai/camera-controls"
  },
  {
   "id": "luma",
   "name": "Luma",
   "short": "Luma",
   "doc": "Camera motion launch notes",
   "url": "https://lumalabs.ai/changelog/camera-motion-concepts-launch"
  },
  {
   "id": "sora",
   "name": "OpenAI Sora 2",
   "short": "Sora",
   "doc": "Sora 2 prompting guide",
   "url": "https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide"
  }
 ],
 "categories": [
  {
   "id": "camera-moves",
   "title": "Camera moves",
   "line": "How the camera moves through the scene.",
   "title_zh": "运镜",
   "line_zh": "镜头在场景里怎样移动。",
   "note": "Each one made in the same scene, so you can compare them.",
   "note_zh": "每个都在同一个场景里做，方便比较。",
   "chips": [
    {
     "id": "body",
     "label": "Moves",
     "ids": [
      "push-in",
      "pull-back",
      "truck",
      "crane-up",
      "orbit",
      "tracking-shot",
      "fpv-flythrough"
     ],
     "label_zh": "移动"
    },
    {
     "id": "turn",
     "label": "Turns",
     "ids": [
      "pan",
      "tilt",
      "roll",
      "whip-pan"
     ],
     "label_zh": "转向"
    },
    {
     "id": "lens",
     "label": "Lens and focus",
     "ids": [
      "zoom-in",
      "crash-zoom",
      "dolly-zoom",
      "rack-focus"
     ],
     "label_zh": "镜头和对焦"
    },
    {
     "id": "fast",
     "label": "Fast",
     "ids": [
      "crash-zoom",
      "whip-pan",
      "handheld",
      "fpv-flythrough"
     ],
     "label_zh": "快速"
    }
   ],
   "ready": true,
   "items": [
    {
     "id": "push-in",
     "no": "01",
     "name": "Push in",
     "line": "The camera moves toward the subject.",
     "use_when": "",
     "prompt": "Push in: the camera moves straight toward the subject, from 11 m to 6.4 m away, over 3.4 seconds with a slow start and a slow end. Near objects slide out of frame faster than the background.",
     "also_called": [
      {
       "name": "Push in",
       "where": "Runway, Kling, Hailuo [Push in]",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "kling",
         "word": ""
        },
        {
         "id": "hailuo",
         "word": "Push in"
        }
       ]
      },
      {
       "name": "Dolly In",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      },
      {
       "name": "slow dolly-in",
       "where": "Sora 2",
       "sources": [
        {
         "id": "sora",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/push-in.mp4"
    },
    {
     "id": "pull-back",
     "no": "02",
     "name": "Pull back",
     "line": "The camera moves away and shows more of the scene.",
     "use_when": "",
     "prompt": "Pull back: the camera moves straight back from the subject, from 4.6 m to 15.5 m away, over 3.4 seconds with a slow start and a slow end, so more of the scene comes into view.",
     "also_called": [
      {
       "name": "Pull back",
       "where": "Runway, Kling",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "kling",
         "word": ""
        }
       ]
      },
      {
       "name": "Pull out",
       "where": "Hailuo [Pull out], Luma",
       "sources": [
        {
         "id": "hailuo",
         "word": "Pull out"
        },
        {
         "id": "luma",
         "word": ""
        }
       ]
      },
      {
       "name": "Dolly Out",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/pull-back.mp4"
    },
    {
     "id": "pan",
     "no": "03",
     "name": "Pan",
     "line": "The camera turns left or right from one spot.",
     "use_when": "",
     "prompt": "Pan right: the camera stays in one spot and turns about 33 degrees from the tree on the left to the subject, over 3.4 seconds with a slow start and a slow end.",
     "also_called": [
      {
       "name": "Pan",
       "where": "Runway, Veo, Kling",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "veo",
         "word": ""
        },
        {
         "id": "kling",
         "word": ""
        }
       ]
      },
      {
       "name": "[Pan right]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "Pan Right",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/pan.mp4"
    },
    {
     "id": "tilt",
     "no": "04",
     "name": "Tilt",
     "line": "The camera turns up or down from one spot.",
     "use_when": "",
     "prompt": "Tilt up: the camera stays in one spot and turns upward from the ground in front of the subject to the subject's head, over 3.4 seconds with a slow start and a slow end.",
     "also_called": [
      {
       "name": "Tilt up",
       "where": "Runway, Veo, Kling",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "veo",
         "word": ""
        },
        {
         "id": "kling",
         "word": ""
        }
       ]
      },
      {
       "name": "[Tilt up]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "Tilt up",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/tilt.mp4"
    },
    {
     "id": "truck",
     "no": "05",
     "name": "Truck",
     "line": "The camera slides sideways, parallel to the scene.",
     "use_when": "",
     "prompt": "Truck right: the camera slides 6.4 m to the right, parallel to the scene, without turning, over 3.4 seconds with a slow start and a slow end. Near columns pass much faster than the far wall.",
     "also_called": [
      {
       "name": "Truck",
       "where": "Runway, Veo, Luma",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "veo",
         "word": ""
        },
        {
         "id": "luma",
         "word": ""
        }
       ]
      },
      {
       "name": "[Truck right]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "Dolly Right",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/truck.mp4"
    },
    {
     "id": "crane-up",
     "no": "06",
     "name": "Crane up",
     "line": "The camera rises and looks down on the subject.",
     "use_when": "",
     "prompt": "Crane up: the camera rises from 0.6 m to 7.5 m high while staying aimed at the subject, so the view turns from eye level to looking down, over 3.4 seconds with a slow start and a slow end.",
     "also_called": [
      {
       "name": "Crane/Jib",
       "where": "Runway",
       "sources": [
        {
         "id": "runway",
         "word": ""
        }
       ]
      },
      {
       "name": "Crane shot",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Crane up",
       "where": "Luma",
       "sources": [
        {
         "id": "luma",
         "word": ""
        }
       ]
      },
      {
       "name": "Crane Up",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/crane-up.mp4"
    },
    {
     "id": "orbit",
     "no": "07",
     "name": "Orbit",
     "line": "The camera circles around the subject.",
     "use_when": "",
     "prompt": "Orbit: the camera circles the subject at 7.5 m, moving 100 degrees from left to right while always facing it, over 3.4 seconds with a slow start and a slow end.",
     "also_called": [
      {
       "name": "Orbit",
       "where": "Runway, Luma",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "luma",
         "word": ""
        }
       ]
      },
      {
       "name": "Orbit slowly",
       "where": "Kling",
       "sources": [
        {
         "id": "kling",
         "word": ""
        }
       ]
      },
      {
       "name": "Arc shot",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Arc Right",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/orbit.mp4"
    },
    {
     "id": "dolly-zoom",
     "no": "08",
     "name": "Dolly zoom",
     "line": "The camera pulls back while the lens zooms in.",
     "use_when": "",
     "prompt": "Dolly zoom: the camera pulls back from 4.6 m to 15 m while the lens zooms in at the same rate, so the subject stays the same size and the background grows behind it, over 3.4 seconds with a slow start and a slow end.",
     "also_called": [
      {
       "name": "Vertigo effect (dolly zoom)",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Dolly Zoom In",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/dolly-zoom.mp4"
    },
    {
     "id": "zoom-in",
     "no": "09",
     "name": "Zoom in",
     "line": "The lens zooms in. The camera does not move.",
     "use_when": "",
     "prompt": "Zoom in: the camera does not move; the lens zooms from a 38 degree to a 15 degree field of view over 3.4 seconds with a slow start and a slow end. Near and far things grow together, with no depth shift.",
     "also_called": [
      {
       "name": "Zoom",
       "where": "Runway",
       "sources": [
        {
         "id": "runway",
         "word": ""
        }
       ]
      },
      {
       "name": "Zoom (in/out)",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "[Zoom in]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "Zoom In",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/zoom-in.mp4"
    },
    {
     "id": "crash-zoom",
     "no": "10",
     "name": "Crash zoom",
     "line": "A very fast zoom in for impact.",
     "use_when": "",
     "prompt": "Crash zoom: hold for 1 second, then the lens zooms from a 40 degree to an 11 degree field of view in 0.32 seconds, hitting fast and settling hard, with motion blur during the zoom. The camera does not move.",
     "also_called": [
      {
       "name": "Crash zoom",
       "where": "Runway",
       "sources": [
        {
         "id": "runway",
         "word": ""
        }
       ]
      },
      {
       "name": "Crash Zoom In",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/crash-zoom.mp4"
    },
    {
     "id": "rack-focus",
     "no": "11",
     "name": "Rack focus",
     "line": "Focus shifts from something near to the subject.",
     "use_when": "",
     "prompt": "Rack focus: the camera does not move; focus starts on the stone urn 2.4 m away with the subject soft, then shifts to the subject 9.4 m away over 1.2 seconds, so the urn goes soft.",
     "also_called": [
      {
       "name": "Rack focus",
       "where": "Runway, Veo",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Focus Change",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/rack-focus.mp4"
    },
    {
     "id": "handheld",
     "no": "12",
     "name": "Handheld",
     "line": "Small natural shakes, like a person holding the camera.",
     "use_when": "",
     "prompt": "Handheld: the camera drifts slowly toward the subject while it sways and shakes slightly, like a person holding it, about 3.5 cm of movement and under half a degree of turn, the whole time.",
     "also_called": [
      {
       "name": "Handheld",
       "where": "Runway, Higgsfield",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      },
      {
       "name": "Handheld or shaky cam",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "[Shake]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "handheld",
       "where": "Sora 2",
       "sources": [
        {
         "id": "sora",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/handheld.mp4"
    },
    {
     "id": "whip-pan",
     "no": "13",
     "name": "Whip pan",
     "line": "A pan so fast the image blurs.",
     "use_when": "",
     "prompt": "Whip pan: hold on the tree for 1.2 seconds, then the camera swings about 34 degrees to the subject in 0.28 seconds, so fast the image smears with motion blur, then holds on the subject.",
     "also_called": [
      {
       "name": "Whip pan",
       "where": "Runway, Veo",
       "sources": [
        {
         "id": "runway",
         "word": ""
        },
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Whip Pan",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/whip-pan.mp4"
    },
    {
     "id": "tracking-shot",
     "no": "14",
     "name": "Tracking shot",
     "line": "The camera moves along with a moving subject.",
     "use_when": "",
     "prompt": "Tracking shot: the subject walks 6.4 m from left to right and the camera moves sideways at the same speed, 6 m away, keeping the subject in frame while the background slides past.",
     "also_called": [
      {
       "name": "Tracking",
       "where": "Runway",
       "sources": [
        {
         "id": "runway",
         "word": ""
        }
       ]
      },
      {
       "name": "tracking shot",
       "where": "Kling",
       "sources": [
        {
         "id": "kling",
         "word": ""
        }
       ]
      },
      {
       "name": "[Tracking shot]",
       "where": "Hailuo",
       "sources": [
        {
         "id": "hailuo",
         "word": ""
        }
       ]
      },
      {
       "name": "tracking left to right",
       "where": "Sora 2",
       "sources": [
        {
         "id": "sora",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/tracking-shot.mp4"
    },
    {
     "id": "roll",
     "no": "15",
     "name": "Roll",
     "line": "The camera tilts sideways around the lens.",
     "use_when": "",
     "prompt": "Roll: the camera turns 18 degrees sideways around the lens while moving slightly closer, over 3.4 seconds with a slow start and a slow end, ending on a tilted Dutch angle.",
     "also_called": [
      {
       "name": "Roll left",
       "where": "Luma",
       "sources": [
        {
         "id": "luma",
         "word": ""
        }
       ]
      },
      {
       "name": "Dutch angle",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Dutch Angle",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/roll.mp4"
    },
    {
     "id": "fpv-flythrough",
     "no": "16",
     "name": "FPV fly-through",
     "line": "A fast drone flight through the scene.",
     "use_when": "",
     "prompt": "FPV fly-through: a fast drone flight that dives low between the two front columns, banks past the right side of the subject, then climbs high over the plaza and looks back down at it, over 4.2 seconds with motion blur.",
     "also_called": [
      {
       "name": "FPV Drone",
       "where": "Higgsfield",
       "sources": [
        {
         "id": "higgsfield",
         "word": ""
        }
       ]
      },
      {
       "name": "Aerial shot or drone shot",
       "where": "Veo",
       "sources": [
        {
         "id": "veo",
         "word": ""
        }
       ]
      },
      {
       "name": "Aerial drone",
       "where": "Luma",
       "sources": [
        {
         "id": "luma",
         "word": ""
        }
       ]
      }
     ],
     "tags": [],
     "refs": [],
     "clip": "../previews/clips/fpv-flythrough.mp4"
    }
   ]
  },
  {
   "id": "motion-graphics",
   "title": "Motion graphics",
   "line": "How shapes, cards and words move on screen.",
   "title_zh": "动态图形",
   "line_zh": "形状、卡片和文字在画面上怎样动。",
   "note": "Each one made in the same scene, so you can compare them.",
   "note_zh": "每个都在同一个场景里做，方便比较。",
   "chips": [
    {
     "id": "shapes",
     "label": "Shapes",
     "ids": [
      "pop-in",
      "overshoot",
      "squash-and-stretch",
      "anticipation",
      "shape-morph"
     ],
     "label_zh": "形状"
    },
    {
     "id": "words",
     "label": "Words and numbers",
     "ids": [
      "mask-reveal",
      "count-up",
      "kinetic-typography"
     ],
     "label_zh": "文字和数字"
    },
    {
     "id": "paths",
     "label": "Lines and paths",
     "ids": [
      "line-draw",
      "motion-path",
      "motion-trail"
     ],
     "label_zh": "线条和路径"
    },
    {
     "id": "groups",
     "label": "Groups and depth",
     "ids": [
      "stagger",
      "parallax"
     ],
     "label_zh": "群组和层次"
    },
    {
     "id": "fx",
     "label": "Light and impact",
     "ids": [
      "light-sweep",
      "glitch",
      "impact-shake"
     ],
     "label_zh": "光效和冲击"
    }
   ],
   "ready": true,
   "items": [
    {
     "id": "pop-in",
     "no": "01",
     "name": "Pop in",
     "line": "A shape grows from nothing with a small bounce.",
     "use_when": "",
     "prompt": "Pop in: a red tile grows from nothing to full size at 0.5 s over 0.6 s, overshooting about 15% before it settles, while it turns into place. A white ball pops in the same way at 1.25 s and a white cylinder at 1.6 s, each over 0.5 s. Every shape grows from its base on the floor.",
     "also_called": [
      {
       "name": "bounceIn / zoomIn",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "back.out ease",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Scale in",
       "where": "UI motion libraries",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      },
      {
       "name": "GSAP: Eases",
       "url": "https://gsap.com/docs/v3/Eases/"
      }
     ],
     "clip": "../previews/clips/motion-graphics/pop-in.mp4"
    },
    {
     "id": "overshoot",
     "no": "02",
     "name": "Overshoot",
     "line": "A shape goes past its stop, then springs back.",
     "use_when": "",
     "prompt": "Overshoot: a white block slides in from the left at 0.5 s and passes its stop mark by about 20% of the distance, then springs back and settles on the mark by 1.4 s. A red block does the same from the right at 1.9 s. The ease is a back-out curve: fast start, overshoot, soft settle.",
     "also_called": [
      {
       "name": "back.out (overshoot amount)",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "easeOutBack",
       "where": "easings.net, CSS cubic-bezier",
       "sources": []
      },
      {
       "name": "backOut",
       "where": "Motion (Framer Motion)",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: Eases",
       "url": "https://gsap.com/docs/v3/Eases/"
      },
      {
       "name": "easings.net: easeOutBack",
       "url": "https://easings.net/#easeOutBack"
      },
      {
       "name": "Motion: easing functions",
       "url": "https://motion.dev/docs/easing-functions"
      }
     ],
     "clip": "../previews/clips/motion-graphics/overshoot.mp4"
    },
    {
     "id": "squash-and-stretch",
     "no": "03",
     "name": "Squash and stretch",
     "line": "A shape flattens on impact and stretches as it moves.",
     "use_when": "",
     "prompt": "Squash and stretch: a red ball drops from above the frame at 0.4 s and hits the floor at 1.0 s, squashing to 60% height and 135% width for 0.1 s, then stretches tall as it bounces up. Two smaller bounces follow (at 1.75 s and 2.3 s), each with less squash, and the ball settles at 2.7 s. Its volume stays the same: when it gets shorter it gets wider.",
     "also_called": [
      {
       "name": "Squash and stretch",
       "where": "Disney's 12 principles of animation",
       "sources": []
      },
      {
       "name": "Squash & stretch",
       "where": "After Effects and Lottie tutorials",
       "sources": []
      },
      {
       "name": "bounce",
       "where": "Animate.css (a bounce without the squash)",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Twelve basic principles of animation",
       "url": "https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation"
      },
      {
       "name": "Squash and stretch",
       "url": "https://en.wikipedia.org/wiki/Squash_and_stretch"
      }
     ],
     "clip": "../previews/clips/motion-graphics/squash-and-stretch.mp4"
    },
    {
     "id": "anticipation",
     "no": "04",
     "name": "Anticipation",
     "line": "A small move back before the big move forward.",
     "use_when": "",
     "prompt": "Anticipation: a red cube crouches to 70% height and leans back away from where it will go, from 0.5 s to 1.1 s. At 1.25 s it springs up, stretched tall, and jumps right in an arc 1.7 m high, landing at 1.8 s with a small squash and a springy settle.",
     "also_called": [
      {
       "name": "Anticipation",
       "where": "Disney's 12 principles of animation",
       "sources": []
      },
      {
       "name": "Wind-up",
       "where": "animation and game design",
       "sources": []
      },
      {
       "name": "anticipate ease",
       "where": "Motion (Framer Motion)",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Twelve basic principles of animation",
       "url": "https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation"
      },
      {
       "name": "Motion: easing functions",
       "url": "https://motion.dev/docs/easing-functions"
      }
     ],
     "clip": "../previews/clips/motion-graphics/anticipation.mp4"
    },
    {
     "id": "stagger",
     "no": "05",
     "name": "Stagger",
     "line": "Many items start the same move one after another.",
     "use_when": "",
     "prompt": "Stagger: a 4 by 4 grid of rounded tiles pops up from the floor in a diagonal wave from the front left corner, each tile starting 0.07 s after the one before, each one rising and growing from 0 to full size over 0.7 s with a soft overshoot. The wave runs from 0.5 s to 2.3 s. One tile is red, the rest are white.",
     "also_called": [
      {
       "name": "stagger",
       "where": "GSAP, Motion (Framer Motion)",
       "sources": []
      },
      {
       "name": "Staggered animation",
       "where": "Flutter, Android docs",
       "sources": []
      },
      {
       "name": "Sequence layers / offset",
       "where": "After Effects",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: Staggers",
       "url": "https://gsap.com/resources/getting-started/Staggers"
      },
      {
       "name": "Motion: stagger",
       "url": "https://motion.dev/docs/stagger"
      }
     ],
     "clip": "../previews/clips/motion-graphics/stagger.mp4"
    },
    {
     "id": "mask-reveal",
     "no": "06",
     "name": "Mask reveal",
     "line": "Content appears from behind an edge or a wipe.",
     "use_when": "",
     "prompt": "Mask reveal: at 0.5 s a red bar wipes across the first line from left to right in 0.45 s; the word \"Mask\" is under it when it wipes away to the right at 0.95 s. At 1.55 s the word \"reveal\" rises up from behind the bottom edge of its line over 0.8 s with a strong ease-out. Nothing fades: the words are cut by hard edges.",
     "also_called": [
      {
       "name": "Track matte reveal",
       "where": "After Effects",
       "sources": []
      },
      {
       "name": "Clip-path / mask reveal",
       "where": "CSS, GSAP",
       "sources": []
      },
      {
       "name": "Wipe reveal, line reveal",
       "where": "motion design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "After Effects: alpha channels, masks and mattes",
       "url": "https://helpx.adobe.com/after-effects/desktop/work-with-transparency-and-compositing/work-with-alpha-channels-and-masks/alpha-channels-masks-mattes.html"
      },
      {
       "name": "MDN: clip-path",
       "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path"
      }
     ],
     "clip": "../previews/clips/motion-graphics/mask-reveal.mp4"
    },
    {
     "id": "line-draw",
     "no": "07",
     "name": "Line draw",
     "line": "A line draws itself from start to end.",
     "use_when": "",
     "prompt": "Line draw: a thick red line draws itself from its start point over the floor, curves around, then rises into a loop and ends in the air, from 0.5 s to 2.9 s with a slow start and a slow end. A small white dot rides the tip of the line as it draws.",
     "also_called": [
      {
       "name": "Trim Paths",
       "where": "After Effects",
       "sources": []
      },
      {
       "name": "DrawSVG / stroke draw-on",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Write-on",
       "where": "motion design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "After Effects: Trim Paths (shape attributes)",
       "url": "https://helpx.adobe.com/after-effects/desktop/drawing-painting-and-paths/shapes-and-shape-attributes/shape-attributes-paint-operations-path.html"
      },
      {
       "name": "GSAP: DrawSVG",
       "url": "https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/"
      }
     ],
     "clip": "../previews/clips/motion-graphics/line-draw.mp4"
    },
    {
     "id": "shape-morph",
     "no": "08",
     "name": "Shape morph",
     "line": "One shape smoothly turns into another.",
     "use_when": "",
     "prompt": "Shape morph: a slowly turning red sphere flows into a rounded cube from 0.6 s to 1.45 s, then flows into a cylinder from 2.3 s to 3.15 s, with a slow start and a slow end each time. It is one shape changing, not a cut or a cross-fade.",
     "also_called": [
      {
       "name": "MorphSVG",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Shape morphing / path morph",
       "where": "After Effects, Lottie",
       "sources": []
      },
      {
       "name": "Morphing",
       "where": "film and animation",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: MorphSVG",
       "url": "https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/"
      },
      {
       "name": "Morphing",
       "url": "https://en.wikipedia.org/wiki/Morphing"
      }
     ],
     "clip": "../previews/clips/motion-graphics/shape-morph.mp4"
    },
    {
     "id": "count-up",
     "no": "09",
     "name": "Count-up",
     "line": "A number rolls up to its final value.",
     "use_when": "",
     "prompt": "Count-up: a big number counts from 0 to 12,480 between 0.5 s and 2.7 s, fast at first and slowing as it nears the end, with a red progress bar filling at the same pace. When it lands, the number gives one small 5% pulse. Digits keep a fixed width so the number does not wobble.",
     "also_called": [
      {
       "name": "CountUp",
       "where": "CountUp.js",
       "sources": []
      },
      {
       "name": "Odometer",
       "where": "HubSpot Odometer",
       "sources": []
      },
      {
       "name": "Rolling number",
       "where": "HyperFrames number-wheel",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "CountUp.js",
       "url": "https://github.com/inorganik/countUp.js"
      },
      {
       "name": "HubSpot Odometer",
       "url": "https://github.com/HubSpot/odometer"
      },
      {
       "name": "HyperFrames: number-wheel",
       "url": "https://hyperframes.heygen.com/catalog/components/number-wheel"
      }
     ],
     "clip": "../previews/clips/motion-graphics/count-up.mp4"
    },
    {
     "id": "kinetic-typography",
     "no": "10",
     "name": "Kinetic typography",
     "line": "Words move, scale and turn to match the voice.",
     "use_when": "",
     "prompt": "Kinetic typography: four words land one by one on the beat. \"Words\" rises out of a mask at 0.4 s, \"that\" swings in from the right at 0.85 s, \"MOVE\" lands huge in red at 1.3 s from 2.4 times its size with a blur that clears, and the block jolts down on impact. \"with you.\" types in letter by letter from 1.9 s. At 3.0 s the whole block turns 6 degrees and pushes slightly closer, then holds.",
     "also_called": [
      {
       "name": "Kinetic typography",
       "where": "motion design term (Saul Bass titles onward)",
       "sources": []
      },
      {
       "name": "Kinetic type / moving type",
       "where": "After Effects and motion design courses",
       "sources": []
      },
      {
       "name": "SplitText animation",
       "where": "GSAP (word and letter splits)",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Kinetic typography",
       "url": "https://en.wikipedia.org/wiki/Kinetic_typography"
      },
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      }
     ],
     "clip": "../previews/clips/motion-graphics/kinetic-typography.mp4"
    },
    {
     "id": "motion-path",
     "no": "11",
     "name": "Motion path",
     "line": "An object travels along a set curve.",
     "use_when": "",
     "prompt": "Motion path: a red pill travels along a curved 3D path that loops around the platform, from 0.5 s to 3.7 s with a slow start and a slow end, always pointing the way it is going. A faint grey guide line shows the whole path.",
     "also_called": [
      {
       "name": "MotionPath",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "offset-path",
       "where": "CSS",
       "sources": []
      },
      {
       "name": "Motion path, auto-orient",
       "where": "After Effects",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: MotionPath",
       "url": "https://gsap.com/docs/v3/Plugins/MotionPathPlugin/"
      },
      {
       "name": "MDN: offset-path",
       "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path"
      }
     ],
     "clip": "../previews/clips/motion-graphics/motion-path.mp4"
    },
    {
     "id": "motion-trail",
     "no": "12",
     "name": "Motion trail",
     "line": "Fading copies follow a moving object.",
     "use_when": "",
     "prompt": "Motion trail: a red ball swings in a high arc from left to right between 0.5 s and 1.5 s, and back between 2.2 s and 3.2 s. Nine see-through copies follow it, each 0.035 s behind the one before, getting fainter and a little smaller.",
     "also_called": [
      {
       "name": "Echo",
       "where": "After Effects",
       "sources": []
      },
      {
       "name": "Ghost trail, afterimage",
       "where": "motion design",
       "sources": []
      },
      {
       "name": "Onion skin look",
       "where": "animation",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "After Effects: Echo effect (time effects)",
       "url": "https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/time-effects.html"
      }
     ],
     "clip": "../previews/clips/motion-graphics/motion-trail.mp4"
    },
    {
     "id": "parallax",
     "no": "13",
     "name": "Parallax",
     "line": "Near layers move faster than far ones.",
     "use_when": "",
     "prompt": "Parallax: four layers slide left together from 0.4 s to 4.6 s with a slow start and a slow end. The row of trees in front moves fastest, the middle hills about half as fast, the back hills slower again, and the red sun barely moves, which gives depth.",
     "also_called": [
      {
       "name": "Parallax scrolling",
       "where": "web and games",
       "sources": []
      },
      {
       "name": "2.5D parallax",
       "where": "After Effects 3D layers",
       "sources": []
      },
      {
       "name": "Multiplane effect",
       "where": "classic animation",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Parallax scrolling",
       "url": "https://en.wikipedia.org/wiki/Parallax_scrolling"
      }
     ],
     "clip": "../previews/clips/motion-graphics/parallax.mp4"
    },
    {
     "id": "light-sweep",
     "no": "14",
     "name": "Light sweep",
     "line": "A band of light slides across a surface.",
     "use_when": "",
     "prompt": "Light sweep: a narrow diagonal band of white light slides across a dark card from left to right, from 0.7 s to 1.65 s, and again from 2.6 s to 3.55 s, with a slow start and a slow end. The card turns a little toward the camera the whole time.",
     "also_called": [
      {
       "name": "CC Light Sweep",
       "where": "After Effects",
       "sources": []
      },
      {
       "name": "Shine / sheen",
       "where": "logo animation",
       "sources": []
      },
      {
       "name": "Light sweep pass",
       "where": "HyperFrames",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "After Effects: generate effects (CC Light Sweep)",
       "url": "https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/generate-effects.html"
      },
      {
       "name": "HyperFrames: light-sweep-pass",
       "url": "https://hyperframes.heygen.com/catalog/components/light-sweep-pass"
      }
     ],
     "clip": "../previews/clips/motion-graphics/light-sweep.mp4"
    },
    {
     "id": "glitch",
     "no": "15",
     "name": "Glitch",
     "line": "Short digital breaks: split colours and jumping slices.",
     "use_when": "",
     "prompt": "Glitch: the word flickers on at 0.5 s, then three short glitch bursts hit at 0.5 s, 1.9 s and 3.3 s (each 0.25 to 0.35 s). In a burst, a red copy and a grey copy split sideways, and a thin slice of the word jumps left or right, changing every frame. Between bursts the word is clean and still.",
     "also_called": [
      {
       "name": "Glitch",
       "where": "HyperFrames, After Effects presets",
       "sources": []
      },
      {
       "name": "RGB split, datamosh look",
       "where": "motion design",
       "sources": []
      },
      {
       "name": "Glitch art",
       "where": "visual art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "HyperFrames: glitch",
       "url": "https://hyperframes.heygen.com/catalog/blocks/glitch"
      },
      {
       "name": "Glitch art",
       "url": "https://en.wikipedia.org/wiki/Glitch_art"
      }
     ],
     "clip": "../previews/clips/motion-graphics/glitch.mp4"
    },
    {
     "id": "impact-shake",
     "no": "16",
     "name": "Impact shake",
     "line": "The frame shakes when something lands hard.",
     "use_when": "",
     "prompt": "Impact shake: a heavy red block drops and lands at 1.0 s; the whole frame shakes hard and the shake dies away in about 0.5 s, while small pieces on the floor jump. A white block lands on top at 2.4 s with a smaller shake.",
     "also_called": [
      {
       "name": "Camera shake",
       "where": "HyperFrames, After Effects wiggle",
       "sources": []
      },
      {
       "name": "Screen shake",
       "where": "game design",
       "sources": []
      },
      {
       "name": "shakeX / shakeY",
       "where": "Animate.css",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "HyperFrames: camera-shake",
       "url": "https://hyperframes.heygen.com/catalog/components/camera-shake"
      },
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      }
     ],
     "clip": "../previews/clips/motion-graphics/impact-shake.mp4"
    }
   ]
  },
  {
   "id": "design-styles",
   "title": "Design styles",
   "line": "How the whole look is drawn: colours, shapes and type.",
   "title_zh": "设计风格",
   "line_zh": "整个画面的样子：颜色、形状和字体。",
   "note": "Each one has its own scene, drawn the way that style looks.",
   "note_zh": "每个风格都有自己的画面，用那个风格的样子画出来。",
   "chips": [
    {
     "id": "tiktok",
     "label": "TikTok looks",
     "ids": [
      "frutiger-aero",
      "dreamcore",
      "scrapbook",
      "doodle",
      "lo-fi-anime",
      "y2k",
      "retro-vhs",
      "storybook-illustration"
     ],
     "label_zh": "TikTok 风"
    },
    {
     "id": "movements",
     "label": "Art movements",
     "ids": [
      "bauhaus",
      "swiss-style",
      "art-deco",
      "memphis",
      "pop-art",
      "art-nouveau",
      "constructivism",
      "de-stijl",
      "op-art",
      "psychedelic-art"
     ],
     "label_zh": "艺术流派"
    },
    {
     "id": "print",
     "label": "Print and paint",
     "ids": [
      "halftone",
      "risograph",
      "duotone",
      "collage",
      "ukiyo-e",
      "watercolor",
      "ink-wash",
      "stained-glass",
      "paper-cut",
      "blueprint",
      "technical-drawing"
     ],
     "label_zh": "印刷和手绘"
    },
    {
     "id": "screen",
     "label": "Screen and UI",
     "ids": [
      "brutalism",
      "flat-vector",
      "claymorphism",
      "glassmorphism",
      "skeuomorphism",
      "dark-hud",
      "frutiger-aero"
     ],
     "label_zh": "屏幕和 UI"
    },
    {
     "id": "3d",
     "label": "3D",
     "ids": [
      "claymorphism",
      "glassmorphism",
      "liquid-metal",
      "isometric",
      "low-poly",
      "steampunk"
     ],
     "label_zh": "3D"
    },
    {
     "id": "retro",
     "label": "Retro and future",
     "ids": [
      "pixel-art",
      "retro-vhs",
      "split-flap",
      "y2k",
      "vaporwave",
      "ascii-art",
      "cyberpunk",
      "neon-sign",
      "steampunk",
      "dark-hud",
      "technical-drawing"
     ],
     "label_zh": "复古和未来"
    },
    {
     "id": "drawn",
     "label": "Drawn and anime",
     "ids": [
      "anime-cel-shading",
      "lo-fi-anime",
      "flat-vector",
      "doodle",
      "storybook-illustration"
     ],
     "label_zh": "手绘和动漫"
    }
   ],
   "ready": true,
   "items": [
    {
     "id": "bauhaus",
     "no": "01",
     "name": "Bauhaus",
     "line": "Circles, squares and bold primary colours.",
     "use_when": "",
     "prompt": "Bauhaus style: build everything from basic geometry (circles, squares, triangles, thick straight bars). Use only red, yellow and blue plus black on an off-white paper background. Flat colour fills, no gradients, no shadows. Asymmetric grid with big colour blocks and thin black rules, often on a diagonal. Type is a bold geometric sans serif in lower case or all caps, sometimes set vertically. Lots of empty space.",
     "also_called": [
      {
       "name": "Bauhaus design",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Geometric modernism",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Bauhaus",
       "url": "https://en.wikipedia.org/wiki/Bauhaus"
      }
     ],
     "clip": "../previews/clips/design-styles/bauhaus.mp4"
    },
    {
     "id": "swiss-style",
     "no": "02",
     "name": "Swiss style",
     "line": "Clean grid, big sans serif, lots of space.",
     "use_when": "",
     "prompt": "Swiss style (International Typographic Style): a strict modular grid, flush left ragged right text, one sans serif family such as Helvetica or Akzidenz Grotesk in two or three weights. Huge headline type, small tidy body text. Mostly black and white with one strong accent colour, often red. Objective photos or simple shapes, aligned to the grid. No decoration, clear hierarchy, lots of white space.",
     "also_called": [
      {
       "name": "International Typographic Style",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Swiss design",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: International Typographic Style",
       "url": "https://en.wikipedia.org/wiki/International_Typographic_Style"
      }
     ],
     "clip": "../previews/clips/design-styles/swiss-style.mp4"
    },
    {
     "id": "art-deco",
     "no": "03",
     "name": "Art Deco",
     "line": "Gold lines, fans and 1920s glamour.",
     "use_when": "",
     "prompt": "Art Deco style: symmetric layout with sunburst rays, stepped shapes, fans, chevrons and thin parallel lines. Palette of black, deep navy or emerald with metallic gold and cream. Sleek streamlined figures and machines. Tall, thin, high contrast display type in all caps with wide letter spacing. Decorative borders and frames, a luxurious 1920s poster feel.",
     "also_called": [
      {
       "name": "Deco",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Streamline Moderne (later form)",
       "where": "Design history",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Art Deco",
       "url": "https://en.wikipedia.org/wiki/Art_Deco"
      }
     ],
     "clip": "../previews/clips/design-styles/art-deco.mp4"
    },
    {
     "id": "memphis",
     "no": "04",
     "name": "Memphis",
     "line": "Playful shapes, squiggles and loud 80s colour.",
     "use_when": "",
     "prompt": "Memphis style (Memphis Group, 1980s): playful scattered shapes such as squiggles, zigzags, confetti dots, triangles and half circles. Bright clashing colours: pink, teal, mint, lilac and black. Black and white patterns like terrazzo specks, grids and stripes. Thick black outlines, flat fills, slightly off balance on purpose. Bold rounded or geometric type.",
     "also_called": [
      {
       "name": "Memphis Group",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Memphis design",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Memphis Group",
       "url": "https://en.wikipedia.org/wiki/Memphis_Group"
      }
     ],
     "clip": "../previews/clips/design-styles/memphis.mp4"
    },
    {
     "id": "pop-art",
     "no": "05",
     "name": "Pop art",
     "line": "Comic book colour, thick lines and dots.",
     "use_when": "",
     "prompt": "Pop art style: comic book look with thick black ink outlines, flat bright primary colours, Ben Day dots for shading, and a speech bubble or a big sound word. Bold, simple everyday subject shown large and centered. Sometimes repeated in a grid in different colour sets, like a silkscreen print. Heavy condensed or comic lettering.",
     "also_called": [
      {
       "name": "Comic style",
       "where": "Behance and Dribbble tags",
       "sources": []
      },
      {
       "name": "Lichtenstein style",
       "where": "Design history",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Pop art",
       "url": "https://en.wikipedia.org/wiki/Pop_art"
      }
     ],
     "clip": "../previews/clips/design-styles/pop-art.mp4"
    },
    {
     "id": "halftone",
     "no": "06",
     "name": "Halftone",
     "line": "The picture is made of printed dots.",
     "use_when": "",
     "prompt": "Halftone style: turn the image into a grid of round dots that grow in dark areas and shrink in light areas, like an old newspaper or offset print. Use one or two ink colours on a flat paper colour, for example deep blue dots on bright paper. Dots are clearly visible at normal size. Simple high contrast subject, little other detail.",
     "also_called": [
      {
       "name": "Halftone effect",
       "where": "Photoshop and Figma plugins",
       "sources": []
      },
      {
       "name": "Dot screen",
       "where": "Print terms",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Halftone",
       "url": "https://en.wikipedia.org/wiki/Halftone"
      }
     ],
     "clip": "../previews/clips/design-styles/halftone.mp4"
    },
    {
     "id": "risograph",
     "no": "07",
     "name": "Risograph",
     "line": "Bright overlapping inks with grain and slight misprint.",
     "use_when": "",
     "prompt": "Risograph print style: two or three bright spot inks such as fluorescent pink, teal and blue, overlapping so they mix where they cross. Grainy, uneven ink with visible paper texture, a little misregistration between colour layers, and soft dot or grain shading instead of smooth gradients. Simple flat shapes, bold hand set type, zine poster feel.",
     "also_called": [
      {
       "name": "Riso print",
       "where": "Behance and Dribbble tags",
       "sources": []
      },
      {
       "name": "Riso effect",
       "where": "Photoshop and Procreate brushes",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Risograph",
       "url": "https://en.wikipedia.org/wiki/Risograph"
      }
     ],
     "clip": "../previews/clips/design-styles/risograph.mp4"
    },
    {
     "id": "duotone",
     "no": "08",
     "name": "Duotone",
     "line": "A picture in just two colours.",
     "use_when": "",
     "prompt": "Duotone style: map a photo to only two colours, one for the shadows and one for the highlights, for example deep navy shadows and bright cyan highlights. Keep strong contrast and a clean, modern layout with a bold sans serif headline. No other colours in the photo.",
     "also_called": [
      {
       "name": "Duotone photo",
       "where": "Photoshop and Figma",
       "sources": []
      },
      {
       "name": "Gradient map",
       "where": "Photoshop",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Duotone",
       "url": "https://en.wikipedia.org/wiki/Duotone"
      }
     ],
     "clip": "../previews/clips/design-styles/duotone.mp4"
    },
    {
     "id": "collage",
     "no": "09",
     "name": "Collage",
     "line": "Cut out photos and paper layered together.",
     "use_when": "",
     "prompt": "Collage style: layer cut out photos, torn paper edges, magazine scraps, tape strips and paper textures. Mix black and white photo pieces with flat colour shapes. Visible cut lines and small drop shadows so the pieces feel physically stacked. Cut out letters or ransom note type for words. Slightly messy but arranged on purpose.",
     "also_called": [
      {
       "name": "Mixed media",
       "where": "Behance and Dribbble tags",
       "sources": []
      },
      {
       "name": "Paper cut out",
       "where": "Design tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Collage",
       "url": "https://en.wikipedia.org/wiki/Collage"
      }
     ],
     "clip": "../previews/clips/design-styles/collage.mp4"
    },
    {
     "id": "brutalism",
     "no": "10",
     "name": "Brutalism",
     "line": "Raw, bold and plain on purpose.",
     "use_when": "",
     "prompt": "Brutalism (web brutalism): raw layout that looks like plain HTML on purpose. Huge black type, system or monospace fonts, thick black borders, hard edges and no rounded corners. Flat blocks of one loud colour on white, no gradients, hard offset shadows. Underlined links, boxes that touch or overlap, visible grid lines. Honest and unpolished, but readable.",
     "also_called": [
      {
       "name": "Web brutalism",
       "where": "UX articles",
       "sources": []
      },
      {
       "name": "Neo brutalism",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Nielsen Norman Group: Brutalism and antidesign",
       "url": "https://www.nngroup.com/articles/brutalism-antidesign/"
      },
      {
       "name": "Kittl: Brutalist art style guide",
       "url": "https://www.kittl.com/blogs/brutalist-art-style-guide-adv/"
      }
     ],
     "clip": "../previews/clips/design-styles/brutalism.mp4"
    },
    {
     "id": "flat-vector",
     "no": "11",
     "name": "Flat vector",
     "line": "Simple shapes, flat colours, no shadows.",
     "use_when": "",
     "prompt": "Flat vector style: clean illustration built from simple shapes with flat colour fills, no gradients, no textures and no realistic shadows. A small friendly palette of four to six colours. Rounded simple figures and objects, crisp edges, lots of clear space. Clean sans serif type. Looks like a modern app or website illustration.",
     "also_called": [
      {
       "name": "Flat design",
       "where": "UI design",
       "sources": []
      },
      {
       "name": "Flat illustration",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Flat design",
       "url": "https://en.wikipedia.org/wiki/Flat_design"
      }
     ],
     "clip": "../previews/clips/design-styles/flat-vector.mp4"
    },
    {
     "id": "claymorphism",
     "no": "12",
     "name": "Claymorphism",
     "line": "Puffy 3D shapes that look made of clay.",
     "use_when": "",
     "prompt": "Claymorphism style: soft, puffy 3D shapes that look made of matte clay or inflated like balloons. Pastel colours such as lilac, mint, baby blue and soft pink. Big rounded corners, a light inner highlight on the top left, a darker inner shadow on the bottom right, and a soft diffuse drop shadow under each shape. Clean studio light, friendly and playful.",
     "also_called": [
      {
       "name": "Clay UI",
       "where": "Dribbble tags",
       "sources": []
      },
      {
       "name": "3D clay",
       "where": "Behance tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Smashing Magazine: Claymorphism",
       "url": "https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/"
      },
      {
       "name": "Dribbble: claymorphism tag",
       "url": "https://dribbble.com/tags/claymorphism"
      }
     ],
     "clip": "../previews/clips/design-styles/claymorphism.mp4"
    },
    {
     "id": "pixel-art",
     "no": "13",
     "name": "Pixel art",
     "line": "Drawn pixel by pixel like an old video game.",
     "use_when": "",
     "prompt": "Pixel art style: everything drawn on a low resolution grid with clearly visible square pixels, no smoothing and no blur. Limited palette of about 16 colours, simple dithering for shading, dark one pixel outlines. Looks like a 16 bit video game screen. Blocky pixel font for any words.",
     "also_called": [
      {
       "name": "8 bit / 16 bit",
       "where": "Game art",
       "sources": []
      },
      {
       "name": "Sprite art",
       "where": "Game art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Pixel art",
       "url": "https://en.wikipedia.org/wiki/Pixel_art"
      }
     ],
     "clip": "../previews/clips/design-styles/pixel-art.mp4"
    },
    {
     "id": "y2k",
     "no": "14",
     "name": "Y2K",
     "line": "Shiny chrome and bubbly late 90s tech.",
     "use_when": "",
     "prompt": "Y2K style (around 1998 to 2004): glossy chrome and liquid metal, iridescent and holographic surfaces, translucent bubble plastic in icy blue, silver and pink. Blobby rounded shapes, star sparkles, lens flares and grid lines. Futuristic wide or bubbly fonts with chrome fill. Feels like an old music player skin or tech ad from the millennium.",
     "also_called": [
      {
       "name": "Y2K aesthetic",
       "where": "Design culture",
       "sources": []
      },
      {
       "name": "Cyber Y2K",
       "where": "Behance and Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Y2K aesthetic",
       "url": "https://en.wikipedia.org/wiki/Y2K_aesthetic"
      }
     ],
     "clip": "../previews/clips/design-styles/y2k.mp4"
    },
    {
     "id": "retro-vhs",
     "no": "15",
     "name": "Retro VHS",
     "line": "A paused 80s home video on an old TV.",
     "use_when": "",
     "prompt": "Retro VHS style: looks like a paused 1980s video tape on an old CRT TV. Soft blurry detail, colour bleeding, red and cyan fringes on edges, horizontal scan lines, a band of tracking noise, slight tape warp and washed out blacks. Warm sunset or neon purple and pink palette. White blocky on screen text like PLAY, a timecode and a date in the corners.",
     "also_called": [
      {
       "name": "VHS effect",
       "where": "Video editing presets",
       "sources": []
      },
      {
       "name": "VHS aesthetic",
       "where": "Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: VHS",
       "url": "https://en.wikipedia.org/wiki/VHS"
      },
      {
       "name": "Dribbble: vhs tag",
       "url": "https://dribbble.com/tags/vhs"
      }
     ],
     "clip": "../previews/clips/design-styles/retro-vhs.mp4"
    },
    {
     "id": "split-flap",
     "no": "16",
     "name": "Split-flap",
     "line": "Letters on flipping tiles, like an old train board.",
     "use_when": "",
     "prompt": "Split-flap style: words shown on a dark grid of tiles, one letter per tile, like an old airport or train departure board. Each tile is matte black with a thin horizontal split line through the middle and off white, condensed bold letters. Rows of small labels, times and numbers, some characters in amber. Real hardware feel with soft reflections and small screws.",
     "also_called": [
      {
       "name": "Solari board",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Flip board",
       "where": "Signage",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Split-flap display",
       "url": "https://en.wikipedia.org/wiki/Split-flap_display"
      }
     ],
     "clip": "../previews/clips/design-styles/split-flap.mp4"
    },
    {
     "id": "dark-hud",
     "no": "17",
     "name": "Dark HUD (FUI)",
     "line": "Sci-fi screens with one glowing accent.",
     "use_when": "",
     "prompt": "Dark HUD (FUI, fantasy user interface) style: near black background with faint topographic contour lines that drift. A heavy white sans serif headline of one to three words, one accent colour (amber) with a soft glow on key words and lines, red only for warnings. Small uppercase mono labels, letter spaced, typed on with a block cursor. Viewfinder corner brackets, 1px thin frames, tiny mono metadata and ticking numbers. Panels sit in 3D space tilted 10 to 18 degrees; the camera zooms through into the scene with motion blur, then keeps creeping in; text racks from blurred to sharp; a light streak sweeps across as a cut. Ease: expo out.",
     "also_called": [
      {
       "name": "FUI / Fantasy user interface",
       "where": "Film and TV screen graphics",
       "sources": []
      },
      {
       "name": "Sci-fi HUD",
       "where": "Motion design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "No Film School: Fantasy User Interfaces",
       "url": "https://nofilmschool.com/storytelling-through-fantasy-user-interfaces"
      },
      {
       "name": "gskinner: FUI and HUDs",
       "url": "https://blog.gskinner.com/archives/2019/04/fui-fun.html"
      },
      {
       "name": "Wikipedia: Head-up display",
       "url": "https://en.wikipedia.org/wiki/Head-up_display"
      }
     ],
     "clip": "../previews/clips/design-styles/dark-hud.mp4"
    },
    {
     "id": "glassmorphism",
     "no": "18",
     "name": "Glassmorphism",
     "line": "Frosted glass panes over glossy shapes.",
     "use_when": "",
     "prompt": "Glassmorphism style: frosted see-through glass panels with rounded corners, a thin bright edge and soft shadow, floating in front of glossy coloured spheres. Everything behind the glass is blurred and slightly bent. Light background with a faint grid. Saturated violet, magenta and lilac spheres with shiny highlights. In 3D: physical glass material with transmission, roughness about 0.3, real refraction; panes drift and slide past each other while the spheres float.",
     "also_called": [
      {
       "name": "Frosted glass UI",
       "where": "UI design",
       "sources": []
      },
      {
       "name": "Glass UI",
       "where": "Dribbble tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Glassmorphism",
       "url": "https://en.wikipedia.org/wiki/Glassmorphism"
      },
      {
       "name": "Nielsen Norman Group: Glassmorphism",
       "url": "https://www.nngroup.com/articles/glassmorphism/"
      }
     ],
     "clip": "../previews/clips/design-styles/glassmorphism.mp4"
    },
    {
     "id": "liquid-metal",
     "no": "19",
     "name": "Liquid metal",
     "line": "Mirror chrome with light streaks on dark.",
     "use_when": "",
     "prompt": "Liquid metal style: mirror chrome surfaces on a dark charcoal background, reflecting long bright light strips (white with one warm and one cool streak). A chrome sphere that ripples like liquid, brushed metal shapes, a reflective dark floor. One small neon accent (lime) on the key item. Clean white sans serif headline, small mono labels. Reflections slide across the metal as the lights turn.",
     "also_called": [
      {
       "name": "Chrome 3D",
       "where": "Behance and Dribbble tags",
       "sources": []
      },
      {
       "name": "Liquid chrome",
       "where": "3D design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Liquid metal",
       "url": "https://en.wikipedia.org/wiki/Liquid_metal"
      },
      {
       "name": "Dribbble: liquid metal tag",
       "url": "https://dribbble.com/tags/liquid_metal"
      }
     ],
     "clip": "../previews/clips/design-styles/liquid-metal.mp4"
    },
    {
     "id": "frutiger-aero",
     "no": "20",
     "name": "Frutiger Aero",
     "line": "Glossy 2000s tech: sky, bubbles, water.",
     "use_when": "",
     "prompt": "Frutiger Aero style (about 2005 to 2013): glossy, optimistic tech look. Bright blue sky with soft clouds, green grass hills, see-through bubbles, water drops and light swooshes, glossy gel buttons with a white shine on top. Clean humanist sans serif type. Everything shiny, fresh and clean.",
     "also_called": [
      {
       "name": "Aero aesthetic",
       "where": "TikTok and internet culture",
       "sources": []
      },
      {
       "name": "Web 2.0 gloss",
       "where": "UI design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Frutiger Aero",
       "url": "https://en.wikipedia.org/wiki/Frutiger_Aero"
      },
      {
       "name": "Creative Bloq: Frutiger Aero revival",
       "url": "https://creativebloq.com/news/frutiger-aero-aesthetic-resurgance"
      }
     ],
     "clip": "../previews/clips/design-styles/frutiger-aero.mp4"
    },
    {
     "id": "dreamcore",
     "no": "21",
     "name": "Dreamcore",
     "line": "Soft dreamy places with a strange calm.",
     "use_when": "",
     "prompt": "Dreamcore style: soft pastel colours (baby blue, pale pink, cream), hazy light, slightly blurred edges. Empty, familiar places that feel like a dream: a room with clouds inside, a door standing alone, a sky through a window. Calm, nostalgic and a little strange. Simple serif or handwritten words, small and quiet.",
     "also_called": [
      {
       "name": "Dreamcore aesthetic",
       "where": "TikTok and internet culture",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Dreamcore",
       "url": "https://en.wikipedia.org/wiki/Dreamcore"
      }
     ],
     "clip": "../previews/clips/design-styles/dreamcore.mp4"
    },
    {
     "id": "scrapbook",
     "no": "22",
     "name": "Scrapbook",
     "line": "Photos, stickers and notes on a page.",
     "use_when": "",
     "prompt": "Scrapbook style: a journal page with taped photos, stamps, stickers, ticket stubs and handwritten notes. Paper textures, washi tape, small doodles, slight rotations, soft drop shadows. Warm and personal. Items stick on one by one.",
     "also_called": [
      {
       "name": "Scrapbook edit",
       "where": "TikTok and Reels",
       "sources": []
      },
      {
       "name": "Journal aesthetic",
       "where": "Pinterest",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Scrapbooking",
       "url": "https://en.wikipedia.org/wiki/Scrapbooking"
      }
     ],
     "clip": "../previews/clips/design-styles/scrapbook.mp4"
    },
    {
     "id": "doodle",
     "no": "23",
     "name": "Doodle",
     "line": "Hand drawn scribbles drawn on top.",
     "use_when": "",
     "prompt": "Doodle style: rough hand drawn lines in marker or pen, drawn on stroke by stroke: arrows, stars, circles, underlines, little hearts and sparkles around a word or subject. Slightly wobbly lines, white or black ink, one bright highlight colour. Playful and quick.",
     "also_called": [
      {
       "name": "Doodle edit",
       "where": "TikTok and Reels",
       "sources": []
      },
      {
       "name": "Hand drawn overlay",
       "where": "Video editing",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Doodle",
       "url": "https://en.wikipedia.org/wiki/Doodle"
      }
     ],
     "clip": "../previews/clips/design-styles/doodle.mp4"
    },
    {
     "id": "lo-fi-anime",
     "no": "24",
     "name": "Lo-fi anime",
     "line": "A cozy anime room at night.",
     "use_when": "",
     "prompt": "Lo-fi anime style: a cozy room at night drawn like a 90s anime background. A desk by a rainy window, a warm lamp, plants, books, a steaming cup, the city lights outside. Soft purple and blue night colours with warm yellow light. Gentle looping motion only: rain, steam, a blinking light. Calm and quiet.",
     "also_called": [
      {
       "name": "Lofi aesthetic",
       "where": "YouTube and TikTok",
       "sources": []
      },
      {
       "name": "Study room anime",
       "where": "Internet culture",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Lo-fi music",
       "url": "https://en.wikipedia.org/wiki/Lo-fi_music"
      }
     ],
     "clip": "../previews/clips/design-styles/lo-fi-anime.mp4"
    },
    {
     "id": "art-nouveau",
     "no": "25",
     "name": "Art Nouveau",
     "line": "Flowing plant lines and curvy frames.",
     "use_when": "",
     "prompt": "Art Nouveau style: long flowing organic lines (whiplash curves), plants, flowers and vines framing a figure with long flowing hair. Ornate curved frame, muted gold, sage green, cream and dusty rose. Decorative hand lettered type. Lines grow and curl like plants.",
     "also_called": [
      {
       "name": "Jugendstil",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Mucha style (art movement)",
       "where": "Illustration",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Art Nouveau",
       "url": "https://en.wikipedia.org/wiki/Art_Nouveau"
      },
      {
       "name": "Midlibrary (Midjourney): Art Nouveau",
       "url": "https://midlibrary.io/styles/art-nouveau"
      }
     ],
     "clip": "../previews/clips/design-styles/art-nouveau.mp4"
    },
    {
     "id": "constructivism",
     "no": "26",
     "name": "Constructivism",
     "line": "Red and black diagonals, bold type.",
     "use_when": "",
     "prompt": "Constructivism style: red, black and off white only. Strong diagonal bars and wedges, circles and photo cut outs, heavy condensed sans serif type set at angles, arrows pointing into the action. Feels like a 1920s poster with energy and urgency. Elements shoot in along the diagonals.",
     "also_called": [
      {
       "name": "Russian Constructivism",
       "where": "Design history",
       "sources": []
      },
      {
       "name": "Propaganda poster style",
       "where": "Graphic design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Constructivism",
       "url": "https://en.wikipedia.org/wiki/Constructivism_(art)"
      },
      {
       "name": "Midlibrary (Midjourney): Constructivism",
       "url": "https://midlibrary.io/styles/constructivism"
      }
     ],
     "clip": "../previews/clips/design-styles/constructivism.mp4"
    },
    {
     "id": "de-stijl",
     "no": "27",
     "name": "De Stijl",
     "line": "Black grid lines with primary blocks.",
     "use_when": "",
     "prompt": "De Stijl style: only horizontal and vertical lines, thick black grid lines on white, with some cells filled red, blue and yellow. No curves, no diagonals, no texture, asymmetric balance. Lines draw in, the grid splits and blocks fill one by one.",
     "also_called": [
      {
       "name": "Neoplasticism",
       "where": "Design history",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: De Stijl",
       "url": "https://en.wikipedia.org/wiki/De_Stijl"
      },
      {
       "name": "Midlibrary (Midjourney): De Stijl",
       "url": "https://midlibrary.io/styles/de-stijl"
      }
     ],
     "clip": "../previews/clips/design-styles/de-stijl.mp4"
    },
    {
     "id": "op-art",
     "no": "28",
     "name": "Op art",
     "line": "Black and white patterns that trick the eye.",
     "use_when": "",
     "prompt": "Op art style: high contrast black and white geometric patterns (stripes, checks, circles) that seem to bulge, wave or vibrate. Precise, hard edged, no texture. The pattern warps as if a sphere pushes through it.",
     "also_called": [
      {
       "name": "Optical art",
       "where": "Art history",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Op art",
       "url": "https://en.wikipedia.org/wiki/Op_art"
      },
      {
       "name": "Midlibrary (Midjourney): Op art",
       "url": "https://midlibrary.io/styles/op-art"
      }
     ],
     "clip": "../previews/clips/design-styles/op-art.mp4"
    },
    {
     "id": "psychedelic-art",
     "no": "29",
     "name": "Psychedelic art",
     "line": "Swirling colour and melting 60s type.",
     "use_when": "",
     "prompt": "Psychedelic art style: 1960s concert poster look. Saturated clashing colours (magenta, orange, lime, violet), swirling liquid shapes, concentric ripples, warped bubble lettering that fills the space. Colours cycle and the shapes swirl and melt.",
     "also_called": [
      {
       "name": "60s poster art",
       "where": "Graphic design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Psychedelic art",
       "url": "https://en.wikipedia.org/wiki/Psychedelic_art"
      },
      {
       "name": "Midlibrary (Midjourney): Psychedelic art",
       "url": "https://midlibrary.io/styles/psychedelic-art"
      }
     ],
     "clip": "../previews/clips/design-styles/psychedelic-art.mp4"
    },
    {
     "id": "ukiyo-e",
     "no": "30",
     "name": "Ukiyo-e",
     "line": "Japanese woodblock print, flat colour.",
     "use_when": "",
     "prompt": "Ukiyo-e style: Japanese woodblock print look. Flat colour areas in Prussian blue, indigo, cream and soft red, bold black outlines, paper texture, a red seal stamp. A big curling wave with claw like foam, a mountain far away. Lines stay clean and flat, no shading gradients.",
     "also_called": [
      {
       "name": "Japanese woodblock",
       "where": "Printmaking",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Ukiyo-e",
       "url": "https://en.wikipedia.org/wiki/Ukiyo-e"
      },
      {
       "name": "Midlibrary (Midjourney): Ukiyo-e",
       "url": "https://midlibrary.io/styles/ukiyo-e"
      }
     ],
     "clip": "../previews/clips/design-styles/ukiyo-e.mp4"
    },
    {
     "id": "watercolor",
     "no": "31",
     "name": "Watercolor",
     "line": "Soft washes that bleed and pool.",
     "use_when": "",
     "prompt": "Watercolor style: soft transparent washes of paint on textured white paper. Colours bleed into each other, pool at the edges with darker rims, and leave white paper showing. Loose shapes, a few fine ink lines. Colour blooms outward as if on wet paper.",
     "also_called": [
      {
       "name": "Watercolour",
       "where": "Painting",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Watercolor painting",
       "url": "https://en.wikipedia.org/wiki/Watercolor_painting"
      }
     ],
     "clip": "../previews/clips/design-styles/watercolor.mp4"
    },
    {
     "id": "ink-wash",
     "no": "32",
     "name": "Ink wash",
     "line": "Black ink brush strokes on white.",
     "use_when": "",
     "prompt": "Ink wash style (sumi-e): black ink on white or rice paper, painted with a brush. Strong tapering strokes, grey washes for distance, lots of empty space. Bamboo, mountains, mist. A small red seal. Strokes paint on one by one.",
     "also_called": [
      {
       "name": "Sumi-e",
       "where": "Japanese painting",
       "sources": []
      },
      {
       "name": "Shui-mo",
       "where": "Chinese painting",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Ink wash painting",
       "url": "https://en.wikipedia.org/wiki/Ink_wash_painting"
      }
     ],
     "clip": "../previews/clips/design-styles/ink-wash.mp4"
    },
    {
     "id": "stained-glass",
     "no": "33",
     "name": "Stained glass",
     "line": "Bright glass pieces in dark lead lines.",
     "use_when": "",
     "prompt": "Stained glass style: a picture made of bright coloured glass pieces (ruby, cobalt, emerald, amber) held by thick dark lead lines. A round rose window shape. Light shines through so pieces glow and flicker softly.",
     "also_called": [
      {
       "name": "Church window",
       "where": "Decorative art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Stained glass",
       "url": "https://en.wikipedia.org/wiki/Stained_glass"
      },
      {
       "name": "Midlibrary (Midjourney): Stained glass",
       "url": "https://midlibrary.io/styles/stained-glass"
      }
     ],
     "clip": "../previews/clips/design-styles/stained-glass.mp4"
    },
    {
     "id": "skeuomorphism",
     "no": "34",
     "name": "Skeuomorphism",
     "line": "Screens that copy real objects.",
     "use_when": "",
     "prompt": "Skeuomorphism style: interface pieces that copy real objects and materials: brushed metal knobs, leather, wood grain, stitched edges, glass dials, real shadows and highlights. An old radio app with a turning knob and a moving needle. Rich, tactile and detailed.",
     "also_called": [
      {
       "name": "Realistic UI",
       "where": "UI design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Skeuomorphism",
       "url": "https://en.wikipedia.org/wiki/Skeuomorphism"
      },
      {
       "name": "Nielsen Norman Group: Skeuomorphism",
       "url": "https://www.nngroup.com/articles/skeuomorphism/"
      }
     ],
     "clip": "../previews/clips/design-styles/skeuomorphism.mp4"
    },
    {
     "id": "isometric",
     "no": "35",
     "name": "Isometric",
     "line": "3D at a fixed angle, no perspective.",
     "use_when": "",
     "prompt": "Isometric style: 3D objects drawn at a fixed 30 degree angle with no perspective, so parallel lines stay parallel. A tiny city block on a floating tile: buildings, trees, a road, a car. Clean flat colours with three tones per object (top, left, right). Buildings rise and the car drives.",
     "also_called": [
      {
       "name": "Isometric illustration",
       "where": "Behance and Dribbble tags",
       "sources": []
      },
      {
       "name": "2.5D",
       "where": "Game art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Isometric video game graphics",
       "url": "https://en.wikipedia.org/wiki/Isometric_video_game_graphics"
      }
     ],
     "clip": "../previews/clips/design-styles/isometric.mp4"
    },
    {
     "id": "low-poly",
     "no": "36",
     "name": "Low poly",
     "line": "Shapes made of a few flat triangles.",
     "use_when": "",
     "prompt": "Low poly style: 3D shapes built from a few large flat triangles, each face a slightly different shade so the facets show. Simple animal or landscape, warm sunset colours. Flat shading, no smooth surfaces. Facets catch the light as it turns.",
     "also_called": [
      {
       "name": "Polygon art",
       "where": "3D design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Low poly",
       "url": "https://en.wikipedia.org/wiki/Low_poly"
      },
      {
       "name": "Midlibrary (Midjourney): Low poly",
       "url": "https://midlibrary.io/styles/low-poly"
      }
     ],
     "clip": "../previews/clips/design-styles/low-poly.mp4"
    },
    {
     "id": "ascii-art",
     "no": "37",
     "name": "ASCII art",
     "line": "Pictures made only of keyboard letters.",
     "use_when": "",
     "prompt": "ASCII art style: a picture made only of text characters in a mono font, darker areas using dense characters like @ # % and lighter areas using . : -. Green or white text on black like an old terminal. The picture types itself in line by line with a blinking cursor.",
     "also_called": [
      {
       "name": "Text art",
       "where": "Computer art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: ASCII art",
       "url": "https://en.wikipedia.org/wiki/ASCII_art"
      },
      {
       "name": "Midlibrary (Midjourney): ASCII art",
       "url": "https://midlibrary.io/styles/ascii-art"
      }
     ],
     "clip": "../previews/clips/design-styles/ascii-art.mp4"
    },
    {
     "id": "anime-cel-shading",
     "no": "38",
     "name": "Anime cel shading",
     "line": "Flat colour with hard shadow edges.",
     "use_when": "",
     "prompt": "Anime cel shading style: flat colour areas with hard edged shadows (one shadow tone, no gradients), clean dark outlines, big bright eyes, spiky hair. Bright sky background. Speed lines and wind for action. Looks like a frame from an anime series.",
     "also_called": [
      {
       "name": "Cel shaded",
       "where": "3D and games",
       "sources": []
      },
      {
       "name": "Anime style",
       "where": "Illustration",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Cel shading",
       "url": "https://en.wikipedia.org/wiki/Cel_shading"
      }
     ],
     "clip": "../previews/clips/design-styles/anime-cel-shading.mp4"
    },
    {
     "id": "vaporwave",
     "no": "39",
     "name": "Vaporwave",
     "line": "Pastel pink and cyan, old computer windows.",
     "use_when": "",
     "prompt": "Vaporwave style: pastel pink, cyan and purple, a classical marble bust, a checkerboard floor going into the distance, old computer pop up windows, palm trees and a gradient sunset. Wide spaced Latin text and a retro 90s desktop feel. Slow, dreamy, a bit ironic.",
     "also_called": [
      {
       "name": "Aesthetic (A E S T H E T I C)",
       "where": "Internet culture",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Vaporwave",
       "url": "https://en.wikipedia.org/wiki/Vaporwave"
      }
     ],
     "clip": "../previews/clips/design-styles/vaporwave.mp4"
    },
    {
     "id": "cyberpunk",
     "no": "40",
     "name": "Cyberpunk",
     "line": "Neon city at night, rain and signs.",
     "use_when": "",
     "prompt": "Cyberpunk style: a dense city at night in the rain, neon signs in magenta and cyan reflecting on wet ground, tall dark buildings, steam, a figure in a hood. High contrast, glowing light against deep shadow. Signs flicker and rain falls.",
     "also_called": [
      {
       "name": "Neon noir",
       "where": "Film and games",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Cyberpunk",
       "url": "https://en.wikipedia.org/wiki/Cyberpunk"
      },
      {
       "name": "Midlibrary (Midjourney): Cyberpunk",
       "url": "https://midlibrary.io/styles/cyberpunk"
      }
     ],
     "clip": "../previews/clips/design-styles/cyberpunk.mp4"
    },
    {
     "id": "steampunk",
     "no": "41",
     "name": "Steampunk",
     "line": "Brass gears, pipes and old machines.",
     "use_when": "",
     "prompt": "Steampunk style: Victorian era machines in brass and copper, polished gears, rivets, pressure gauges, pipes and puffs of steam, dark wood. Warm metallic light. Gears turn and mesh, steam vents.",
     "also_called": [
      {
       "name": "Victorian sci-fi",
       "where": "Genre art",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Steampunk",
       "url": "https://en.wikipedia.org/wiki/Steampunk"
      },
      {
       "name": "Midlibrary (Midjourney): Steampunk",
       "url": "https://midlibrary.io/styles/steampunk"
      }
     ],
     "clip": "../previews/clips/design-styles/steampunk.mp4"
    },
    {
     "id": "neon-sign",
     "no": "42",
     "name": "Neon sign",
     "line": "Glowing tube letters on a dark wall.",
     "use_when": "",
     "prompt": "Neon sign style: glowing glass tube letters and icons on a dark brick wall, bent tube shapes with rounded ends, a strong colour glow spilling onto the wall. Hot pink, cyan and warm white. The sign buzzes and flickers on, one part at a time.",
     "also_called": [
      {
       "name": "Neon light",
       "where": "Signage",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Neon sign",
       "url": "https://en.wikipedia.org/wiki/Neon_sign"
      }
     ],
     "clip": "../previews/clips/design-styles/neon-sign.mp4"
    },
    {
     "id": "paper-cut",
     "no": "43",
     "name": "Paper cut",
     "line": "Layered paper with soft shadows.",
     "use_when": "",
     "prompt": "Paper cut style: a scene made of stacked layers of cut paper, each layer a flat colour with a soft shadow on the layer behind, giving real depth. Simple wavy shapes, an underwater scene with fish and seaweed. Layers sway gently at different speeds.",
     "also_called": [
      {
       "name": "Papercraft",
       "where": "Illustration",
       "sources": []
      },
      {
       "name": "Layered paper",
       "where": "Behance tags",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Paper cutting",
       "url": "https://en.wikipedia.org/wiki/Paper_cutting"
      }
     ],
     "clip": "../previews/clips/design-styles/paper-cut.mp4"
    },
    {
     "id": "blueprint",
     "no": "44",
     "name": "Blueprint",
     "line": "White lines on blue technical paper.",
     "use_when": "",
     "prompt": "Blueprint style: thin white technical lines on deep blue paper with a fine grid. A rocket or machine drawn in outline, with dimension lines, arrows, numbers and small mono labels. Precise and engineered. The drawing traces itself line by line.",
     "also_called": [
      {
       "name": "Technical drawing",
       "where": "Engineering",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Blueprint",
       "url": "https://en.wikipedia.org/wiki/Blueprint"
      },
      {
       "name": "Midlibrary (Midjourney): Blueprint",
       "url": "https://midlibrary.io/styles/blueprint"
      }
     ],
     "clip": "../previews/clips/design-styles/blueprint.mp4"
    },
    {
     "id": "technical-drawing",
     "no": "45",
     "name": "Technical drawing",
     "line": "A pencil sketch that turns blueprint, then hologram.",
     "use_when": "",
     "prompt": "Technical drawing style with a sketch to blueprint to hologram morph: one object drawn three ways with no cuts and a locked, front-on camera. Stage 1: graphite pencil lines that wobble slightly, stroked twice, on cream graph paper (#EDE6D5) with a fine blue grid, fills are blue diagonal hatching drawn on one line at a time, small mono labels like FIG. 01 and STEP 04 / 12. Stage 2: a straight edge wipes across and the same drawing becomes clean white lines on bright blueprint blue (#1B3ED2), hidden edges dashed, fine white hatching, dimension lines. Stage 3: another wipe turns it into a cyan (#45F0DD) wireframe hologram on black, lines with a white core, fills as horizontal scan lines. The object keeps turning slowly. Heavy sans serif word at the bottom in each stage ink. No glows, no crossfades.",
     "also_called": [
      {
       "name": "Draftsman sketch",
       "where": "Illustration",
       "sources": []
      },
      {
       "name": "Sketch to hologram morph",
       "where": "Motion design",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Technical drawing",
       "url": "https://en.wikipedia.org/wiki/Technical_drawing"
      },
      {
       "name": "Wikipedia: Hatching",
       "url": "https://en.wikipedia.org/wiki/Hatching"
      },
      {
       "name": "Wikipedia: Wire-frame model",
       "url": "https://en.wikipedia.org/wiki/Wire-frame_model"
      }
     ],
     "clip": "../previews/clips/design-styles/technical-drawing.mp4"
    },
    {
     "id": "storybook-illustration",
     "no": "46",
     "name": "Storybook illustration",
     "line": "A cozy painted picture-book scene.",
     "use_when": "",
     "prompt": "Storybook illustration style (cozy game art): a soft painted 2D scene with grainy paper texture and slightly rough painted edges. Gentle layered mountains in lilac, a calm pond, green grass, flowers and big leaves in the foreground, a vine across the top corner. A small, cute, round character with dot eyes and blushing cheeks. Light moves through the day: pink dawn sky, bright blue day with a sun crossing, then deep blue night with a moon, stars and glowing fireflies. The character hops, waves and blinks; leaves and flowers sway. Warm, calm and handmade.",
     "also_called": [
      {
       "name": "Cozy game art",
       "where": "Games",
       "sources": []
      },
      {
       "name": "Picture book style",
       "where": "Illustration",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Wikipedia: Picture book",
       "url": "https://en.wikipedia.org/wiki/Picture_book"
      },
      {
       "name": "Wikipedia: Children's book illustration",
       "url": "https://en.wikipedia.org/wiki/Children%27s_book_illustration"
      },
      {
       "name": "Wikipedia: Cozy game",
       "url": "https://en.wikipedia.org/wiki/Cozy_game"
      }
     ],
     "clip": "../previews/clips/design-styles/storybook-illustration.mp4"
    }
   ]
  },
  {
   "id": "transitions",
   "title": "Transitions",
   "line": "How one shot changes into the next.",
   "title_zh": "转场",
   "line_zh": "一个镜头怎样换到下一个。",
   "note": "Each one made in the same scene, so you can compare them.",
   "note_zh": "每个都在同一个场景里做，方便比较。",
   "chips": [],
   "ready": false,
   "items": []
  },
  {
   "id": "text",
   "title": "Text animation",
   "line": "How words appear and leave.",
   "title_zh": "文字动画",
   "line_zh": "文字怎样出现和离开。",
   "note": "Each one is built in code on the same light stage.",
   "note_zh": "每个都用 code 做，放在同一个浅色画面上。",
   "chips": [
    {
     "id": "appear",
     "label": "Appear",
     "ids": [
      "letter-fade",
      "blur-in",
      "word-pop",
      "line-by-line",
      "tracking-in",
      "flip-in",
      "stagger-center"
     ],
     "label_zh": "出现"
    },
    {
     "id": "type",
     "label": "Type and decode",
     "ids": [
      "typewriter",
      "scramble",
      "rotating-words"
     ],
     "label_zh": "打字和解码"
    },
    {
     "id": "captions",
     "label": "Captions",
     "ids": [
      "karaoke-captions",
      "word-by-word",
      "highlight-box",
      "keyword-captions"
     ],
     "label_zh": "字幕"
    },
    {
     "id": "emphasis",
     "label": "Emphasis",
     "ids": [
      "wave",
      "highlighter",
      "underline-draw",
      "text-shimmer",
      "rubber-band",
      "weight-morph",
      "neon-flicker",
      "circular-text"
     ],
     "label_zh": "强调"
    },
    {
     "id": "3d",
     "label": "3D text",
     "ids": [
      "extruded-3d",
      "chrome-text",
      "glass-text",
      "text-spin",
      "flip-in"
     ],
     "label_zh": "3D 文字"
    },
    {
     "id": "exit",
     "label": "Exit",
     "ids": [
      "blur-out",
      "text-explode"
     ],
     "label_zh": "离场"
    },
    {
     "id": "letters",
     "label": "Letter by letter",
     "ids": [
      "letter-fade",
      "blur-in",
      "flip-in",
      "typewriter",
      "scramble",
      "wave",
      "stagger-center",
      "weight-morph"
     ],
     "label_zh": "逐字"
    }
   ],
   "ready": true,
   "items": [
    {
     "id": "letter-fade",
     "no": "01",
     "name": "Fade in by letter",
     "line": "Letters fade up one after another.",
     "use_when": "",
     "prompt": "Fade in by letter: the words \"Hello there\" are split into single letters. Starting at 0.5 s, each letter rises 60 px and fades from 0 to full over 0.6 s with a power3 ease out (cubic-bezier(0.215, 0.61, 0.355, 1)). The next letter starts 0.06 s after the one before, left to right, so the line is done by about 1.7 s. Then it holds still.",
     "also_called": [
      {
       "name": "Fade Up Characters",
       "where": "After Effects text presets (Animate In)",
       "sources": []
      },
      {
       "name": "per-character-rise",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "SplitText chars + stagger",
       "where": "GSAP",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      },
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      }
     ],
     "clip": "../previews/clips/text/letter-fade.mp4"
    },
    {
     "id": "blur-in",
     "no": "02",
     "name": "Blur in",
     "line": "Letters come into focus from a soft blur.",
     "use_when": "",
     "prompt": "Blur in: the words \"Into focus\" are split into letters. Starting at 0.5 s, each letter goes from 24 px blur, 0 opacity and 30 px low to sharp, full and in place over 0.9 s with an expo style ease out (cubic-bezier(0.22, 1, 0.36, 1)). Letters start 0.04 s apart, left to right. Then it holds still.",
     "also_called": [
      {
       "name": "soft-blur-in / focus-blur-resolve",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "text-focus-in",
       "where": "Animista",
       "sources": []
      },
      {
       "name": "Blur Text",
       "where": "React Bits",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      },
      {
       "name": "Animista: text animations",
       "url": "https://animista.net/play/text"
      },
      {
       "name": "React Bits: Blur Text",
       "url": "https://reactbits.dev/text-animations/blur-text"
      }
     ],
     "clip": "../previews/clips/text/blur-in.mp4"
    },
    {
     "id": "word-pop",
     "no": "03",
     "name": "Word pop",
     "line": "Each word pops in with a springy bounce.",
     "use_when": "",
     "prompt": "Word pop: three words, \"Big news\" on the first line and \"today\" in red on the second. Starting at 0.5 s, each word scales from 40% to 100% and fades in over 0.5 s with a back ease out (back.out(2.2), about 15% overshoot, then settles). The next word starts 0.25 s later. Then it holds still.",
     "also_called": [
      {
       "name": "spring-scale-in",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "bounceIn / zoomIn",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "Pop / scale pop",
       "where": "Video editors and caption apps",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      },
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      }
     ],
     "clip": "../previews/clips/text/word-pop.mp4"
    },
    {
     "id": "line-by-line",
     "no": "04",
     "name": "Line by line",
     "line": "Each line slides in after the one before.",
     "use_when": "",
     "prompt": "Line by line: three lines, \"Start small.\", \"Stay with it.\" and \"Get better.\" (the last one in red). Starting at 0.5 s, each whole line slides in from 80 px to the left and fades in over 0.9 s with an expo style ease out (cubic-bezier(0.22, 1, 0.36, 1)). The next line starts 0.35 s later. Then it holds still.",
     "also_called": [
      {
       "name": "line-by-line-slide",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "SplitText lines + stagger",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Fade in lines",
       "where": "Slide and video tools",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      },
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      }
     ],
     "clip": "../previews/clips/text/line-by-line.mp4"
    },
    {
     "id": "tracking-in",
     "no": "05",
     "name": "Tracking in",
     "line": "Wide spaced letters pull together into a word.",
     "use_when": "",
     "prompt": "Tracking in: one word, \"BREATHE\", in capitals. At 0.5 s it starts with letter spacing at 0.9 em, 0 opacity and 12 px blur. Over 1.6 s the spacing closes to 0.02 em with a power3 ease out, while opacity and blur clear in the first 0.9 s. Then it holds still.",
     "also_called": [
      {
       "name": "tracking-in-expand / tracking-in-contract",
       "where": "Animista",
       "sources": []
      },
      {
       "name": "Tracking animator",
       "where": "After Effects text animators",
       "sources": []
      },
      {
       "name": "letter-spacing animation",
       "where": "CSS",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Animista: text animations",
       "url": "https://animista.net/play/text"
      }
     ],
     "clip": "../previews/clips/text/tracking-in.mp4"
    },
    {
     "id": "flip-in",
     "no": "06",
     "name": "Flip in",
     "line": "Letters flip up on their bottom edge in 3D.",
     "use_when": "",
     "prompt": "Flip in: the words \"Turn it up\" are split into letters, each hinged on its bottom edge with 800 px perspective. Starting at 0.5 s, each letter turns from rotateX -100 degrees (lying back, unseen) to 0 over 0.8 s with a back ease out (back.out(1.7)), and fades in over the first 0.25 s. Letters start 0.07 s apart, left to right. Then it holds still.",
     "also_called": [
      {
       "name": "flipInX",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "SplitText chars + rotationX",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "3D flip text",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      },
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      }
     ],
     "clip": "../previews/clips/text/flip-in.mp4"
    },
    {
     "id": "typewriter",
     "no": "07",
     "name": "Typewriter",
     "line": "Letters appear one at a time, like typing.",
     "use_when": "",
     "prompt": "Typewriter: the words \"Just start typing.\" appear one letter at a time, left aligned on two lines, with a red block cursor after the last letter. The cursor blinks (0.5 s on, 0.5 s off) until 0.6 s, then typing starts: one new letter every 0.09 s, each one appearing at once with no fade (steps(1, end)). The cursor stays solid while typing, moves with the text, and blinks again once the line is done.",
     "also_called": [
      {
       "name": "Typewriter",
       "where": "After Effects text presets (Animate In)",
       "sources": []
      },
      {
       "name": "TextPlugin",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "typewriter (steps easing)",
       "where": "animate-text skill, CSS",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: TextPlugin",
       "url": "https://gsap.com/docs/v3/Plugins/TextPlugin/"
      },
      {
       "name": "CSS-Tricks: Typewriter effect",
       "url": "https://css-tricks.com/snippets/css/typewriter-effect/"
      },
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      }
     ],
     "clip": "../previews/clips/text/typewriter.mp4"
    },
    {
     "id": "scramble",
     "no": "08",
     "name": "Scramble text",
     "line": "Random letters settle into the real words.",
     "use_when": "",
     "prompt": "Scramble text: the words \"Signal found\" in a monospace font. At 0.5 s every letter slot shows a random capital letter or digit in grey, changing every 0.05 s. From 0.8 s the real letters lock in from left to right, one every 0.1 s, and turn dark when they lock. The line is fully readable at about 2.0 s, then holds still.",
     "also_called": [
      {
       "name": "ScrambleText",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Decrypted Text / Scrambled Text",
       "where": "React Bits",
       "sources": []
      },
      {
       "name": "Decode effect, hacker text",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: ScrambleTextPlugin",
       "url": "https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/"
      },
      {
       "name": "React Bits: Decrypted Text",
       "url": "https://reactbits.dev/text-animations/decrypted-text"
      }
     ],
     "clip": "../previews/clips/text/scramble.mp4"
    },
    {
     "id": "rotating-words",
     "no": "09",
     "name": "Rotating words",
     "line": "One word swaps for the next in the same spot.",
     "use_when": "",
     "prompt": "Rotating words: \"Make it\" stays on the first line. On the second line, \"simple\" rises in at 0.5 s. At 1.6 s and 2.8 s the current word slides up out of its line and fades while the next word slides up in from below, both over 0.55 s with a power3 ease in-out, inside a clip so nothing shows outside the line. Order: simple, faster, better (the last one in red). Then it holds still.",
     "also_called": [
      {
       "name": "Word Rotate",
       "where": "Magic UI",
       "sources": []
      },
      {
       "name": "Rotating Text",
       "where": "React Bits",
       "sources": []
      },
      {
       "name": "Text Loop",
       "where": "Motion Primitives",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Magic UI: Word Rotate",
       "url": "https://magicui.design/docs/components/word-rotate"
      },
      {
       "name": "React Bits: Rotating Text",
       "url": "https://reactbits.dev/text-animations/rotating-text"
      },
      {
       "name": "Motion Primitives: Text Loop",
       "url": "https://motion-primitives.com/docs/text-loop"
      }
     ],
     "clip": "../previews/clips/text/rotating-words.mp4"
    },
    {
     "id": "wave",
     "no": "10",
     "name": "Wave text",
     "line": "Letters rise and fall in a moving wave.",
     "use_when": "",
     "prompt": "Wave text: the words \"Ride the wave\" sit still until 0.5 s. Then each letter moves up 40 px and back down on a sine ease, 0.6 s up and 0.6 s down, repeating. Each letter starts 0.07 s after the one to its left, so a wave runs through the line from left to right. It keeps going until the end.",
     "also_called": [
      {
       "name": "Wavy text",
       "where": "Magic UI, CSS tutorials",
       "sources": []
      },
      {
       "name": "wave letters (animation-delay per letter)",
       "where": "CSS",
       "sources": []
      },
      {
       "name": "Bouncing letters",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "DEV: Animate the letters in a string with CSS",
       "url": "https://dev.to/fossheim/how-to-style-and-animate-the-letters-in-a-string-using-css-mjd"
      },
      {
       "name": "CSS IRL: Negative animation delay (wave letters)",
       "url": "https://css-irl.info/quick-tip-negative-animation-delay/"
      }
     ],
     "clip": "../previews/clips/text/wave.mp4"
    },
    {
     "id": "highlighter",
     "no": "11",
     "name": "Highlighter",
     "line": "A marker stroke sweeps behind the key words.",
     "use_when": "",
     "prompt": "Highlighter: three lines, \"Read the\", \"important\", \"part first.\" A soft red marker band (a slightly rough, tilted bar behind the letters) sweeps from left to right behind \"important\" from 0.8 s over 0.6 s, then behind \"first\" from 1.6 s over 0.4 s, both with a power2 ease in-out. The text stays dark on top of the band. Then it holds still.",
     "also_called": [
      {
       "name": "highlight annotation",
       "where": "Rough Notation",
       "sources": []
      },
      {
       "name": "Highlighter (highlight)",
       "where": "Magic UI",
       "sources": []
      },
      {
       "name": "Marker highlight",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Rough Notation",
       "url": "https://roughnotation.com/"
      },
      {
       "name": "Magic UI: Highlighter",
       "url": "https://magicui.design/docs/components/highlighter"
      }
     ],
     "clip": "../previews/clips/text/highlighter.mp4"
    },
    {
     "id": "underline-draw",
     "no": "12",
     "name": "Underline draw",
     "line": "A line draws itself under a word.",
     "use_when": "",
     "prompt": "Underline draw: two lines, \"Remember\" and \"this one.\" A hand drawn red underline draws itself under \"this one\" from left to right, from 0.8 s over 0.7 s with a power2 ease in-out. A second, thinner pass draws back from right to left from 1.45 s over 0.5 s, like a quick double stroke. Then it holds still.",
     "also_called": [
      {
       "name": "underline annotation",
       "where": "Rough Notation",
       "sources": []
      },
      {
       "name": "DrawSVG / stroke draw-on",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Highlighter (underline)",
       "where": "Magic UI",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Rough Notation",
       "url": "https://roughnotation.com/"
      },
      {
       "name": "GSAP: DrawSVGPlugin",
       "url": "https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/"
      },
      {
       "name": "Magic UI: Highlighter",
       "url": "https://magicui.design/docs/components/highlighter"
      }
     ],
     "clip": "../previews/clips/text/underline-draw.mp4"
    },
    {
     "id": "text-shimmer",
     "no": "13",
     "name": "Text shimmer",
     "line": "A dark band runs across grey text.",
     "use_when": "",
     "prompt": "Text shimmer: the words \"Thinking it over\" in light grey. A dark band about one third of the text width runs across the letters from left to right, only inside the letter shapes (gradient clipped to the text). Each pass takes 1.5 s with linear speed: 0.5 to 2.0 s, 2.0 to 3.5 s, 3.5 to 5.0 s.",
     "also_called": [
      {
       "name": "Text Shimmer",
       "where": "Motion Primitives",
       "sources": []
      },
      {
       "name": "Shiny Text",
       "where": "React Bits",
       "sources": []
      },
      {
       "name": "Animated Shiny Text",
       "where": "Magic UI",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Motion Primitives: Text Shimmer",
       "url": "https://motion-primitives.com/docs/text-shimmer"
      },
      {
       "name": "React Bits: Shiny Text",
       "url": "https://reactbits.dev/text-animations/shiny-text"
      },
      {
       "name": "Magic UI: Animated Shiny Text",
       "url": "https://magicui.design/docs/components/animated-shiny-text"
      }
     ],
     "clip": "../previews/clips/text/text-shimmer.mp4"
    },
    {
     "id": "rubber-band",
     "no": "14",
     "name": "Rubber band",
     "line": "A word stretches and snaps back like elastic.",
     "use_when": "",
     "prompt": "Rubber band: the red word \"Boing!\" fades in at 0.3 s over 0.2 s. At 0.8 s it plays a 1 s rubber band: scale x/y goes 1/1, then 1.25/0.75 at 30%, 0.75/1.25 at 40%, 1.15/0.85 at 50%, 0.95/1.05 at 65%, 1.05/0.95 at 75%, back to 1/1 at 100%, eased between keys. It plays again at 2.8 s.",
     "also_called": [
      {
       "name": "rubberBand",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "jello / wobble (related)",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "Elastic stretch",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      },
      {
       "name": "Animista: text animations",
       "url": "https://animista.net/play/text"
      }
     ],
     "clip": "../previews/clips/text/rubber-band.mp4"
    },
    {
     "id": "blur-out",
     "no": "15",
     "name": "Blur out",
     "line": "Words drift up and blur away.",
     "use_when": "",
     "prompt": "Blur out: the words \"See you\" and \"soon.\" fade in at 0.3 s over 0.4 s and hold. At 2.0 s each word moves up 40 px, blurs to 16 px and fades to 0 over 0.8 s with an ease in (cubic-bezier(0.64, 0, 0.78, 0)). Words leave 0.15 s apart, first to last. The frame stays empty to the end.",
     "also_called": [
      {
       "name": "blur-out-up",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "text-blur-out",
       "where": "Animista",
       "sources": []
      },
      {
       "name": "fadeOutUp",
       "where": "Animate.css",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      },
      {
       "name": "Animista: text animations",
       "url": "https://animista.net/play/text"
      },
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      }
     ],
     "clip": "../previews/clips/text/blur-out.mp4"
    },
    {
     "id": "text-explode",
     "no": "16",
     "name": "Text explode",
     "line": "Letters burst apart and fly off screen.",
     "use_when": "",
     "prompt": "Text explode: the word \"BOOM\" sits in the middle. At 1.2 s it shakes for 0.25 s (about 6 px). At 1.5 s every letter flies out from the centre in its own direction at 1400 to 2200 px per second, spinning 360 to 720 degrees, with gravity pulling down (2600 px per second squared), fading out over 1.2 s. At 3.4 s the word fades back in over 0.5 s with a small scale up from 90%, so the clip loops.",
     "also_called": [
      {
       "name": "SplitText + Physics2D",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Shatter / explode text",
       "where": "Common name",
       "sources": []
      },
      {
       "name": "Letter scatter",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "GSAP: Physics2DPlugin",
       "url": "https://gsap.com/docs/v3/Plugins/Physics2DPlugin/"
      },
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      }
     ],
     "clip": "../previews/clips/text/text-explode.mp4"
    },
    {
     "id": "karaoke-captions",
     "no": "17",
     "name": "Karaoke captions",
     "line": "Each word lights up as it is spoken.",
     "use_when": "",
     "prompt": "Karaoke captions: a two line caption, \"You only need\" / \"one small start.\", fades in at 0.4 s over 0.2 s in dark text. From 0.8 s each word turns red in reading order, one word every 0.38 s, each change taking 0.08 s, so it follows a voice. Words that were spoken stay red. The last word turns red at about 2.7 s, then it holds.",
     "also_called": [
      {
       "name": "Karaoke effect (k tags)",
       "where": "ASS subtitles, Aegisub",
       "sources": []
      },
      {
       "name": "Word highlight captions",
       "where": "Submagic, CapCut style captions",
       "sources": []
      },
      {
       "name": "Word by word karaoke",
       "where": "Short video editors",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Aegisub: ASS override tags (karaoke)",
       "url": "https://aegisub.org/docs/latest/ass_tags/"
      },
      {
       "name": "Submagic: AI captions",
       "url": "https://www.submagic.co/ai-caption"
      }
     ],
     "clip": "../previews/clips/text/karaoke-captions.mp4"
    },
    {
     "id": "word-by-word",
     "no": "18",
     "name": "Word by word captions",
     "line": "One word on screen at a time.",
     "use_when": "",
     "prompt": "Word by word captions: big centred words, one at a time: \"This\", \"is\", \"how\", \"you\", \"say\", \"it.\" The first shows at 0.4 s and each next word replaces it every 0.45 s with a hard cut. Each word pops from 85% to 100% scale over 0.12 s with a power2 ease out. The last word is red and stays to the end.",
     "also_called": [
      {
       "name": "One word captions",
       "where": "Opus Clip, Submagic",
       "sources": []
      },
      {
       "name": "Single word subtitles",
       "where": "Short video editors",
       "sources": []
      },
      {
       "name": "Fast captions",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Opus Clip: AI caption generator",
       "url": "https://www.opus.pro/tools/ai-caption-generator"
      },
      {
       "name": "Submagic: AI captions",
       "url": "https://www.submagic.co/ai-caption"
      }
     ],
     "clip": "../previews/clips/text/word-by-word.mp4"
    },
    {
     "id": "highlight-box",
     "no": "19",
     "name": "Highlight box captions",
     "line": "A box jumps to the word being spoken.",
     "use_when": "",
     "prompt": "Highlight box captions: the caption \"Small steps\" / \"every day.\" shows at 0.4 s. A red rounded box sits behind the spoken word and that word turns white. The box appears on \"Small\" at 0.6 s (scale 70% to 100%, 0.15 s), then slides and resizes to the next word every 0.5 s (0.15 s each, power2 ease out). It ends on \"day.\" at 2.1 s and holds.",
     "also_called": [
      {
       "name": "Highlight colour captions",
       "where": "Submagic",
       "sources": []
      },
      {
       "name": "Active word box",
       "where": "Caption apps",
       "sources": []
      },
      {
       "name": "Box highlight subtitles",
       "where": "VEED, CapCut style captions",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Submagic help: highlight colours",
       "url": "https://care.submagic.co/en/article/how-to-apply-highlighting-colors-to-your-words-16ttppq/"
      },
      {
       "name": "VEED: auto subtitle generator",
       "url": "https://www.veed.io/tools/auto-subtitle-generator-online"
      }
     ],
     "clip": "../previews/clips/text/highlight-box.mp4"
    },
    {
     "id": "keyword-captions",
     "no": "20",
     "name": "Keyword captions",
     "line": "Bold captions where the key word pops.",
     "use_when": "",
     "prompt": "Keyword captions: heavy capital captions, a short chunk at a time, centred. \"STOP WAITING\" pops up at 0.4 s, \"FOR THE\" replaces it at 1.3 s, the key word \"PERFECT\" at 2.2 s and \"MOMENT\" at 3.1 s. Each chunk rises 40 px and fades in over 0.2 s with back.out(2). The key word is red, 1.3 times bigger and pops from 50% to 115% to 100% scale over 0.35 s.",
     "also_called": [
      {
       "name": "Hormozi style captions",
       "where": "Submagic, Kapwing",
       "sources": []
      },
      {
       "name": "Emphasis captions",
       "where": "Caption apps",
       "sources": []
      },
      {
       "name": "Bold pop captions",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Submagic blog: Hormozi style captions",
       "url": "https://www.submagic.co/blog/how-to-make-alex-hormozi-captions"
      },
      {
       "name": "Kapwing: Hormozi style captions template",
       "url": "https://www.kapwing.com/explore/hormozi-style-captions-template"
      }
     ],
     "clip": "../previews/clips/text/keyword-captions.mp4"
    },
    {
     "id": "extruded-3d",
     "no": "21",
     "name": "Extruded 3D text",
     "line": "Thick solid letters with real depth.",
     "use_when": "",
     "prompt": "Extruded 3D text: the word \"BOLD\" as solid red 3D letters with deep extrusion and a small rounded bevel, lit by a soft key light with shadows on a light studio backdrop. From 0.5 s it rises into place and turns from 50 degrees to 20 degrees on the vertical axis over 0.9 s with a power3 ease out, then sways slowly between 20 and -20 degrees (sine in-out, 1.8 s each way) to the end.",
     "also_called": [
      {
       "name": "TextGeometry (extrude + bevel)",
       "where": "Three.js",
       "sources": []
      },
      {
       "name": "Extrude",
       "where": "Blender, Cinema 4D, After Effects 3D",
       "sources": []
      },
      {
       "name": "3D type",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Three.js: TextGeometry",
       "url": "https://threejs.org/docs/pages/TextGeometry.html"
      },
      {
       "name": "Three.js example: 3D text",
       "url": "https://threejs.org/examples/webgl_geometry_text.html"
      }
     ],
     "clip": "../previews/clips/text/extruded-3d.mp4"
    },
    {
     "id": "chrome-text",
     "no": "22",
     "name": "Chrome text",
     "line": "Mirror metal letters with light sliding over them.",
     "use_when": "",
     "prompt": "Chrome text: the word \"SHINE\" as extruded 3D letters in mirror metal (metalness 1, roughness about 0.12) reflecting a soft studio environment, on a light backdrop. It fades in at 0.3 s over 0.4 s. From 0.5 s to 4.5 s it turns from -30 to 30 degrees on the vertical axis with a sine in-out ease, so the reflections slide across the letters.",
     "also_called": [
      {
       "name": "Metallic / chrome type",
       "where": "Photoshop and 3D text styles",
       "sources": []
      },
      {
       "name": "metalness + envMap",
       "where": "Three.js",
       "sources": []
      },
      {
       "name": "Liquid chrome",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Three.js: MeshStandardMaterial (metalness)",
       "url": "https://threejs.org/docs/pages/MeshStandardMaterial.html"
      },
      {
       "name": "Three.js example: environment maps",
       "url": "https://threejs.org/examples/webgl_materials_envmaps.html"
      }
     ],
     "clip": "../previews/clips/text/chrome-text.mp4"
    },
    {
     "id": "glass-text",
     "no": "23",
     "name": "Glass text",
     "line": "Clear glass letters that bend what is behind.",
     "use_when": "",
     "prompt": "Glass text: the word \"GLASS\" as thick extruded letters in clear glass (transmission 1, thickness 0.6, roughness 0.05, index of refraction 1.5) in front of a panel of red, dark and light stripes. The stripes slide left at a steady speed for the whole clip so you see them bend through the letters. The word fades in at 0.3 s and turns from -15 to 15 degrees with a sine in-out ease from 0.5 s to 4.5 s.",
     "also_called": [
      {
       "name": "Glass type",
       "where": "Common name",
       "sources": []
      },
      {
       "name": "transmission (MeshPhysicalMaterial)",
       "where": "Three.js",
       "sources": []
      },
      {
       "name": "Refraction text",
       "where": "3D tools",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Three.js: MeshPhysicalMaterial (transmission)",
       "url": "https://threejs.org/docs/pages/MeshPhysicalMaterial.html"
      },
      {
       "name": "Three.js example: physical transmission",
       "url": "https://threejs.org/examples/webgl_materials_physical_transmission.html"
      }
     ],
     "clip": "../previews/clips/text/glass-text.mp4"
    },
    {
     "id": "text-spin",
     "no": "24",
     "name": "3D text spin",
     "line": "The word spins in and lands facing you.",
     "use_when": "",
     "prompt": "3D text spin: the word \"SPIN\" as white extruded 3D letters with red sides. It appears at 0.5 s and spins in on its vertical axis from -540 degrees to 0 (one and a half turns) while scaling from 60% to 100%, over 1.6 s with an expo ease out, so it slows down and lands facing the camera. Then it holds.",
     "also_called": [
      {
       "name": "Spin in / Y rotation",
       "where": "3D text presets",
       "sources": []
      },
      {
       "name": "flipInY (2D cousin)",
       "where": "Animate.css",
       "sources": []
      },
      {
       "name": "Turntable",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "Three.js: TextGeometry",
       "url": "https://threejs.org/docs/pages/TextGeometry.html"
      },
      {
       "name": "Animate.css",
       "url": "https://animate.style/"
      }
     ],
     "clip": "../previews/clips/text/text-spin.mp4"
    },
    {
     "id": "weight-morph",
     "no": "25",
     "name": "Weight morph",
     "line": "Letters go from thin to heavy and back.",
     "use_when": "",
     "prompt": "Weight morph: the word \"Weight\" in a variable font starts at weight 200. From 0.5 s each letter goes to weight 900 over 0.6 s and back to 200 over 0.6 s (sine in-out), repeating, with each letter starting 0.08 s after the one to its left, so a heavy wave runs through the word until the end.",
     "also_called": [
      {
       "name": "Variable font animation",
       "where": "MDN, v-fonts",
       "sources": []
      },
      {
       "name": "font-variation-settings wght",
       "where": "CSS",
       "sources": []
      },
      {
       "name": "Weight wave",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "MDN: font-variation-settings",
       "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings"
      },
      {
       "name": "v-fonts: variable fonts",
       "url": "https://v-fonts.com/"
      }
     ],
     "clip": "../previews/clips/text/weight-morph.mp4"
    },
    {
     "id": "circular-text",
     "no": "26",
     "name": "Circular text",
     "line": "A word runs around a turning circle.",
     "use_when": "",
     "prompt": "Circular text: the words \"ROUND AND\" repeated three times around a circle about 560 px wide, with a red dot in the middle. At 0.4 s the ring scales from 80% to 100%, turns from -60 degrees to 0 and fades in over 0.8 s with a power3 ease out. Then it turns clockwise at a steady 36 degrees per second to the end.",
     "also_called": [
      {
       "name": "Text on a path (textPath)",
       "where": "SVG, MDN",
       "sources": []
      },
      {
       "name": "Rotating text badge",
       "where": "Web design",
       "sources": []
      },
      {
       "name": "Type on a circle",
       "where": "Illustrator, Figma",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "MDN: SVG textPath",
       "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath"
      }
     ],
     "clip": "../previews/clips/text/circular-text.mp4"
    },
    {
     "id": "stagger-center",
     "no": "27",
     "name": "Stagger from center",
     "line": "Letters appear from the middle outward.",
     "use_when": "",
     "prompt": "Stagger from center: the word \"Centered\" is split into letters. From 0.5 s the middle letters appear first and the rest follow outward to both edges, 0.06 s apart: each letter goes from 0 opacity, 40 px low and 6 px blur to clear and in place over 0.7 s with an expo style ease out (cubic-bezier(0.22, 1, 0.36, 1)). Then it holds.",
     "also_called": [
      {
       "name": "stagger-from-center",
       "where": "animate-text skill",
       "sources": []
      },
      {
       "name": "stagger from: center",
       "where": "GSAP",
       "sources": []
      },
      {
       "name": "Center out reveal",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "animate-text (named text effects)",
       "url": "https://github.com/pixel-point/animate-text"
      },
      {
       "name": "GSAP: SplitText",
       "url": "https://gsap.com/docs/v3/Plugins/SplitText/"
      }
     ],
     "clip": "../previews/clips/text/stagger-center.mp4"
    },
    {
     "id": "neon-flicker",
     "no": "28",
     "name": "Neon flicker",
     "line": "A glowing sign word flickers on.",
     "use_when": "",
     "prompt": "Neon flicker: a dark rounded panel holds the words \"OPEN\" / \"LATE\" as unlit grey tubes. At 0.6 s the tubes flicker on and off (on 0.6, off 0.68, on 0.75, off 0.9, on 1.0, off 1.1, on 1.3 s), then glow steady red with a soft layered glow (stacked text shadows). At 3.0 s the letter \"T\" flickers twice (off 3.0, on 3.08, off 3.18, on 3.3 s), then all stay on.",
     "also_called": [
      {
       "name": "Neon sign text",
       "where": "CSS-Tricks, Daily Dev Tips",
       "sources": []
      },
      {
       "name": "Flicker effect",
       "where": "CSS animation",
       "sources": []
      },
      {
       "name": "Neon glow",
       "where": "Common name",
       "sources": []
      }
     ],
     "tags": [],
     "refs": [
      {
       "name": "CSS-Tricks: How to create neon text",
       "url": "https://css-tricks.com/how-to-create-neon-text-with-css/"
      },
      {
       "name": "Daily Dev Tips: CSS neon animation",
       "url": "https://daily-dev-tips.com/posts/css-neon-animation/"
      }
     ],
     "clip": "../previews/clips/text/neon-flicker.mp4"
    }
   ]
  }
 ]
};
