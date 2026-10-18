# Contributing

Thanks for helping. New effects, better clips, fixes to names and new categories are all welcome.

## Rules for a new effect

1. **A real name.** Use the name people already use for the effect, and add at least one source link (an official tool guide, a library's docs, a design reference). No made-up names.
2. **A clip made in code.** Build it with the scene scripts in `scripts/`, 9:16, 720 px wide, about 5 seconds, with the same labels as the other clips. No stock footage and no generated pictures.
3. **A prompt that rebuilds it.** Write what moves, how far, how long and the easing, so a person or an AI tool can make the same effect from the words alone.
4. **No brands.** No company logos or product names inside the clips. Sample words stay general.
5. **Plain words.** Short sentences. English for names and prompts. Chinese labels for the site go in `site/zh.json`.

## Steps

1. Fork the repo and make a branch.
2. Add the effect to `data/<category>.json` and build its clip (see "Rebuild the clips" in the README).
3. Run `node site/build.mjs` and open `site/index.html` to check it plays, opens and copies.
4. Check the page at phone width too.
5. Open a pull request with a short note on what you added and the source links.

## Reporting a problem

Open an issue with the effect name, what looks wrong, and a screenshot if you can.
