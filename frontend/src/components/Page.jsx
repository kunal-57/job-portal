function Page({ kicker, title, lede, actions, children }) {
    return (
        <div className="page">
            <header className="page-header">
                <div>
                    {kicker ? <p className="page-kicker">{kicker}</p> : null}
                    <h1>{title}</h1>
                    {lede ? <p className="page-lede">{lede}</p> : null}
                </div>
                {actions}
            </header>
            {children}
        </div>
    );
}

export default Page;
