export class dhsActor extends Actor {
    prepareDerivedData() {
        let level = +this.system.level; 
        if (!isNaN(level)){
            this.system.xp.max = (level * (level+1)/2)*100;
        }
    }
}