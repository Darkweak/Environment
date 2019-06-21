import React from 'react';
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { TextContainer } from "./Container";
import { connect } from "react-redux";
import { ThemeReducerProps } from "./store/themeReducer";

export interface IChildren {
    children: any;
}

export interface IClassName {
    className?: string;
}

interface Reducer {
    ThemeReducer: ThemeReducerProps,
}

export interface ITheme {
    backgroundTheme: string;
    textTheme: string;
}

export const themeMapStateToProps = (reducers: Reducer) => ({
    ...reducers.ThemeReducer
});

interface ILayout {
    container?: boolean;
    fixed?: boolean;
    noPadding?: boolean;
    textContainer?: boolean;
    title?: string;
}
export const Layout: any = connect(
    themeMapStateToProps,
    {}
)(({
       backgroundTheme,
       children,
       container,
       fixed,
       noPadding,
       textTheme,
       textContainer,
       title
   }: ILayout & IChildren & ITheme) => (
    <React.Fragment>
        <main className={`text-${textTheme} bg-${backgroundTheme}`}>
            <Navbar/>
            <div className={(noPadding || title) ? '' : 'py-5'}>
                {
                    title ?
                        <h1 className={`text-center py-5 text-${textTheme} bg-${backgroundTheme}`}>{ title }</h1> : null
                }
                {
                    container ?
                        <div className="container">
                            {
                                textContainer ?
                                    <TextContainer>
                                        {children}
                                    </TextContainer> :
                                    children
                            }
                        </div> :
                        textContainer ?
                            <TextContainer>
                                {children}
                            </TextContainer> :
                            children
                }
            </div>
        </main>
        <Footer/>
    </React.Fragment>
));
