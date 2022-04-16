# Many Pacmen
> Week 7 Project from MIT xPro Full Stack Certificate program



## Description 
The original goal of this project was to create many pacmen using a JavaScript "factory," have them move in random directions and bounce of boundary walls.

### Original Project Goals:
- Create a single Pacman with the click of a button
- Be able to create many Pacmen by running the same function again
- Keep track of the information for each Pacman in an array of all the Pacmen
- Use array methods and DOM injection
- Have all Pacmen start moving in random directions and speeds
- All Pacmen bounce off boundary edges and keep moving

### Refactoring:
- Created my own pacman svg images (1 open mouth and 1 closed mouth)
- Using JavaScript to switch the image src for open and closed mouth
- Using css translate to rotate and flip images according to direction
- Interval of movement is set to 200ms to get the "chomp" effect
- Directions are chosen by a random integer generator that chooses between left, none, and right for the x direction movement and up, none, and down for the y direction movement. The 2 are then combined.
- If both random choices result in no movement in either direction (no movement at all) then I have another "coin-toss" random number generator to assign a direction of movement
- I chose not to have the Pacmen move at different speeds. To see a project with fully random direction of movement and speeds please see my [Bouncing Balls Project](https://github.com/kParsonsDesign/bouncingBalls)



## To Run
This project can be viewed live at [kParsonsDesign.github.io/many-pacmen/](https://kParsonsDesign.github.io/many-pacmen/).



## Roadmap
- May have the Pacmen eat each other (either based on relative size, direction of movement, or z-index)



## Disclaimer
This is a personal project based on a copyrighted or trademarked work. It is intended for educational and entertainment purposes only. I make no profit from this project and it is not available for resale by any other entity.



## License
[Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://github.com/kParsonsDesign/many-pacmen/blob/main/LICENSE)

This is a human-readable summary of (and not a substitute for) the license:

### You are free to:

**Share** -- copy and redistribute the material in any medium or format

**Adapt** -- remix, transform, and build upon the material

### Under the following terms:

**Attribution** -- You must give *appropriate credit*, provide a link to the license, and *indicate if changes were made*. You may do so in any reasonable manner, but not in any way that suggests the lecensor endorses you or your use.

**NonCommercial** -- You may **not** use the material for *commercial purposes*.

**ShareAlike** -- If you remix, transform, or build upon the material, you must distribute your contributions under the *same license* as the original.

**No additional restrictions** -- You may not apply legal terms or *technological measures* that legally restrict others from doing anything the license permits.

### Notices:

You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable *exception or limitation*.

No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as *publicity, privacy, or moral rights* may limit how you use the material.
