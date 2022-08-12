export class dhsActor extends Actor {
    prepareDerivedData() {
        let level = +this.data.data.level; 
        if (!isNaN(level)){
            this.data.data.xp.max = (level * (level+1)/2)*100;
        }
    }
}