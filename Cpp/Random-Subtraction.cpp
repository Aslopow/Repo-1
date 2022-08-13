#include<iostream>
#include<algorithm>
#include<cstdlib>
#include<stdlib.h>
#include<ctime>
using namespace std;

int main()
{
    int a,s,d,q=0;
    cout<<"Hello World!\n       From Aslopow\n";
    cout << "Please Input Max And Min\n";
    cin >> a>>s;
    system("cls");
    cout << "Please Input Frequency" << endl;
    cin>>d;
    int w=d;
    system("cls");
    while(d>0) {
        int z,l;
        srand(time(NULL));
        z=rand()%(a/2-s+1)+s;
        int x;
        srand(time(NULL));
        x=rand()%(z-s-1)+s;
        printf("%d-%d=",z,x);
        cin >> l;
        if(z-x==l){
            cout << "Right" << endl;
            q++;
        } else {
            cout << "Cross" << endl <<"The Right Number is "<<z-x;
            cout<< endl;
        }
        d--;
    }
    cout << "Right " << q <<" All "<<w<<" Cross "<<w-q;
    return 0;
}
