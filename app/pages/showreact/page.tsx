import ComponentHello from "./componentHello";



export default function Page() {
  const var1 = "hello";
  return (
    <div>
        <ComponentHello Param1="Alexandre Yip"/>
      <div>
        ola 
        {true ? var1 : "bye"}
      </div>    
    </div>
  );
}

