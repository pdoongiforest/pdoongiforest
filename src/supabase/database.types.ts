export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      board: {
        Row: {
          board_cls: string | null;
          board_id: string;
          contents: string | null;
          created_at: string | null;
          deadline: string | null;
          hash_tag: string[] | null;
          profile_id: string;
          recruitment_number: number | null;
          title: string | null;
        };
        Insert: {
          board_cls?: string | null;
          board_id: string;
          contents?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          hash_tag?: string[] | null;
          profile_id: string;
          recruitment_number?: number | null;
          title?: string | null;
        };
        Update: {
          board_cls?: string | null;
          board_id?: string;
          contents?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          hash_tag?: string[] | null;
          profile_id?: string;
          recruitment_number?: number | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_user_profile_TO_board_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      board_save: {
        Row: {
          board_cls: string | null;
          contents: string | null;
          created_at: string | null;
          deadline: string | null;
          hash_tag: string[] | null;
          profile_id: string;
          recruitment_number: number | null;
          title: string | null;
          update_at: string | null;
        };
        Insert: {
          board_cls?: string | null;
          contents?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          hash_tag?: string[] | null;
          profile_id: string;
          recruitment_number?: number | null;
          title?: string | null;
          update_at?: string | null;
        };
        Update: {
          board_cls?: string | null;
          contents?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          hash_tag?: string[] | null;
          profile_id?: string;
          recruitment_number?: number | null;
          title?: string | null;
          update_at?: string | null;
        };
        Relationships: [];
      };
      certification: {
        Row: {
          approve: boolean | null;
          certification_id: string;
          email: string | null;
          image: string | null;
        };
        Insert: {
          approve?: boolean | null;
          certification_id: string;
          email?: string | null;
          image?: string | null;
        };
        Update: {
          approve?: boolean | null;
          certification_id?: string;
          email?: string | null;
          image?: string | null;
        };
        Relationships: [];
      };
      comment: {
        Row: {
          board_id: string;
          comment_id: string;
          content: string | null;
          created_at: string | null;
          profile_id: string;
        };
        Insert: {
          board_id: string;
          comment_id: string;
          content?: string | null;
          created_at?: string | null;
          profile_id: string;
        };
        Update: {
          board_id?: string;
          comment_id?: string;
          content?: string | null;
          created_at?: string | null;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_board_TO_comment_1';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'board';
            referencedColumns: ['board_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_comment_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      comment_reply: {
        Row: {
          comment_id: string;
          contents: string | null;
          created_at: string | null;
          profile_id: string;
          reply_id: string;
        };
        Insert: {
          comment_id: string;
          contents?: string | null;
          created_at?: string | null;
          profile_id: string;
          reply_id: string;
        };
        Update: {
          comment_id?: string;
          contents?: string | null;
          created_at?: string | null;
          profile_id?: string;
          reply_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_comment_TO_comment_reply_1';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'comment';
            referencedColumns: ['comment_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_comment_reply_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      news_cards: {
        Row: {
          id: number;
          image: string;
          title: string;
          url: string;
        };
        Insert: {
          id?: never;
          image: string;
          title: string;
          url: string;
        };
        Update: {
          id?: never;
          image?: string;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      notification: {
        Row: {
          board_id: string | null;
          content: string | null;
          created_at: string | null;
          id: string;
          is_read: boolean | null;
          profile_id: string | null;
          type: string | null;
        };
        Insert: {
          board_id?: string | null;
          content?: string | null;
          created_at?: string | null;
          id: string;
          is_read?: boolean | null;
          profile_id?: string | null;
          type?: string | null;
        };
        Update: {
          board_id?: string | null;
          content?: string | null;
          created_at?: string | null;
          id?: string;
          is_read?: boolean | null;
          profile_id?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      peer_review: {
        Row: {
          created_at: string | null;
          is_active: boolean | null;
          profile_id: string;
          review_contents: string | null;
          review_id: string;
          review_score: number | null;
          study_id: string;
          writer_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          is_active?: boolean | null;
          profile_id: string;
          review_contents?: string | null;
          review_id: string;
          review_score?: number | null;
          study_id: string;
          writer_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          is_active?: boolean | null;
          profile_id?: string;
          review_contents?: string | null;
          review_id?: string;
          review_score?: number | null;
          study_id?: string;
          writer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_study_TO_peer_review_1';
            columns: ['study_id'];
            isOneToOne: false;
            referencedRelation: 'study';
            referencedColumns: ['study_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_peer_review_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      scrap: {
        Row: {
          board_id: string;
          profile_id: string;
          scrap_id: string;
        };
        Insert: {
          board_id: string;
          profile_id: string;
          scrap_id: string;
        };
        Update: {
          board_id?: string;
          profile_id?: string;
          scrap_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_board_TO_scrap_1';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'board';
            referencedColumns: ['board_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_scrap_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      study: {
        Row: {
          board_id: string;
          profile_id: string;
          study_id: string;
        };
        Insert: {
          board_id?: string;
          profile_id?: string;
          study_id?: string;
        };
        Update: {
          board_id?: string;
          profile_id?: string;
          study_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_board_TO_study_1';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'board';
            referencedColumns: ['board_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_study_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      study_approve: {
        Row: {
          id: string;
          profile_id: string;
          status: string | null;
          study_id: string;
        };
        Insert: {
          id?: string;
          profile_id?: string;
          status?: string | null;
          study_id?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          status?: string | null;
          study_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_study_TO_study_approve_1';
            columns: ['study_id'];
            isOneToOne: false;
            referencedRelation: 'study';
            referencedColumns: ['study_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_study_approve_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      study_member: {
        Row: {
          authority: string | null;
          member_id: string;
          profile_id: string;
          study_id: string;
        };
        Insert: {
          authority?: string | null;
          member_id?: string;
          profile_id?: string;
          study_id?: string;
        };
        Update: {
          authority?: string | null;
          member_id?: string;
          profile_id?: string;
          study_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_study_TO_study_member_1';
            columns: ['study_id'];
            isOneToOne: false;
            referencedRelation: 'study';
            referencedColumns: ['study_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_study_member_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      thread: {
        Row: {
          contents: string | null;
          created_at: string | null;
          like_user: string[] | null;
          profile_id: string;
          study_id: string;
          thread_id: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string | null;
          like_user?: string[] | null;
          profile_id: string;
          study_id: string;
          thread_id: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string | null;
          like_user?: string[] | null;
          profile_id?: string;
          study_id?: string;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_study_TO_thread_1';
            columns: ['study_id'];
            isOneToOne: false;
            referencedRelation: 'study';
            referencedColumns: ['study_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_thread_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      thread_reply: {
        Row: {
          contents: string | null;
          created_at: string | null;
          like_user: string[] | null;
          profile_id: string;
          reply_id: string;
          thread_id: string;
        };
        Insert: {
          contents?: string | null;
          created_at?: string | null;
          like_user?: string[] | null;
          profile_id?: string;
          reply_id?: string;
          thread_id?: string;
        };
        Update: {
          contents?: string | null;
          created_at?: string | null;
          like_user?: string[] | null;
          profile_id?: string;
          reply_id?: string;
          thread_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_thread_TO_thread_reply_1';
            columns: ['thread_id'];
            isOneToOne: false;
            referencedRelation: 'thread';
            referencedColumns: ['thread_id'];
          },
          {
            foreignKeyName: 'FK_user_profile_TO_thread_reply_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
      thread_resource: {
        Row: {
          contents: string | null;
          resource_id: string;
          thread_id: string;
          type: string | null;
        };
        Insert: {
          contents?: string | null;
          resource_id?: string;
          thread_id?: string;
          type?: string | null;
        };
        Update: {
          contents?: string | null;
          resource_id?: string;
          thread_id?: string;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_thread_TO_thread_resource_1';
            columns: ['thread_id'];
            isOneToOne: false;
            referencedRelation: 'thread';
            referencedColumns: ['thread_id'];
          },
        ];
      };
      user_base: {
        Row: {
          approve: string | null;
          created_at: string | null;
          email: string | null;
          name: string | null;
          recent_at: string | null;
          status: string | null;
          user_id: string;
        };
        Insert: {
          approve?: string | null;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
          recent_at?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Update: {
          approve?: string | null;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
          recent_at?: string | null;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_profile: {
        Row: {
          age: number | null;
          interest: string[] | null;
          introduce: string | null;
          nickname: string | null;
          profile_id: string;
          profile_images: string | null;
          role: string | null;
          user_id: string;
          visibility: Json | null;
        };
        Insert: {
          age?: number | null;
          interest?: string[] | null;
          introduce?: string | null;
          nickname?: string | null;
          profile_id?: string;
          profile_images?: string | null;
          role?: string | null;
          user_id?: string;
          visibility?: Json | null;
        };
        Update: {
          age?: number | null;
          interest?: string[] | null;
          introduce?: string | null;
          nickname?: string | null;
          profile_id?: string;
          profile_images?: string | null;
          role?: string | null;
          user_id?: string;
          visibility?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_user_base_TO_user_profile_1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user_base';
            referencedColumns: ['user_id'];
          },
        ];
      };
      user_social: {
        Row: {
          created_at: string | null;
          profile_id: string;
          social: string | null;
          social_id: string;
          social_link: string | null;
        };
        Insert: {
          created_at?: string | null;
          profile_id?: string;
          social?: string | null;
          social_id?: string;
          social_link?: string | null;
        };
        Update: {
          created_at?: string | null;
          profile_id?: string;
          social?: string | null;
          social_id?: string;
          social_link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_user_profile_TO_user_social_1';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'user_profile';
            referencedColumns: ['profile_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      board_cls: '0' | '1';
      membership_status: '0' | '1' | '2';
      status: '0' | '1' | '2' | '3';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      board_cls: ['0', '1'],
      membership_status: ['0', '1', '2'],
      status: ['0', '1', '2', '3'],
    },
  },
} as const;
