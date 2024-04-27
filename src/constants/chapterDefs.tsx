const importCode = `
import java.util.List;
import java.util.ArrayList;
`

export const chapterDefs: { [key: string]: any } = {
    chapter1: {
        mainExacute:
 `
class Main{
    public static void main(String args[]){
        System.out.print("1:"+ new Example().example(1));
        System.out.print(",50:"+ new Example().example(50));
        System.out.print(",100:"+ new Example().example(100));
        System.out.print(",101:"+ new Example().example(101));
    }
}
        `,
        initCode:
`${importCode}

/*
 * 引数valueが偶数の場合はtrueを奇数の場合はfalseを返すコードを作成する
 */
class Example{
    public boolean example(int value){
        if((value % 2) == 0){
            return true;
        } 
        return false;
    }
}
        `,
        expected: `1:false,50:true,100:true,101:false`
    }
}