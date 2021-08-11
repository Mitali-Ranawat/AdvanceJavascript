 
class QueenAttack {
    constructor(queen1, queen2) {
        if((queen1[0]<0 || queen1[0]>7 || queen1[1]<0 || queen1[1]>7) 
          || (queen2[0]<0 || queen2[0]>7 || queen2[1]<0 || queen2[1]>7)) throw new Error('Queens must be placed on the board');
        this.position_q1 = queen1;
        this.position_q2 = queen2;
    }

    canAttack() {
      let r1 = this.position_q1[0] 
      let c1 = this.position_q1[1] 
      let r2 = this.position_q2[0] 
      let c2 = this.position_q2[1] 

      if(r1 === r2 && c1 === c2) throw new Error('Queens cannot share same position');

      if(r1==r2) 
        return true
      if(c1==c2) 
        return true

      //same diagnol
      if( Math.abs((c1 - c2)/(r1 - r2)) === 1)
        return true
      
      return false

    }
}

const queen1 = [0, 0];
const queen2 = [6, 6];

const result = new QueenAttack(queen1, queen2);
console.log(result.canAttack());